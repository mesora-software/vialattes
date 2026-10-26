"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Image from "next/image";
import AimPanel from "./AimPanel";
import DraggablePanel from "./DraggablePanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";
import ZipEnemy from "./ZipEnemy";
import RewardPopup from "./RewardPopup";
import { POSITION_REWARDS } from "@/lib/rewards/reward-config";
import { grantReward } from "@/lib/rewards/reward-storage";
import MissionComplete from "../MissionComplete";

// Tipos
type Zip = {
  id: number;
  position: number;
  status: "armed" | "defeated";
  animationDelay: number;
  animationDuration: number;
};

type Shot = {
  id: string;
  position: number;
  phase: "falling" | "exploding";
  bombSize: number;
  fallDuration: number;
};

type RewardEffect = {
  id: string;
  position: number;
  xp: number;
  lattecoins: number;
};

// Configurações
const TOTAL_ZIPS = POSITION_REWARDS.totalZips;
const EXPLOSION_DURATION = 500;
const NEXT_ROUND_DELAY = 500;

const DESKTOP_BOMB_SIZE = 40;
const MOBILE_BOMB_SIZE = 22;
const DESKTOP_BOMB_SPEED = 400;
const MOBILE_BOMB_SPEED = 140;

const MOBILE_BREAKPOINT = 1024;

const AXIS_OFFSET = 30;

const TOTAL_XP =
  TOTAL_ZIPS * POSITION_REWARDS.xpPerZip;

const TOTAL_LATTECOINS =
  TOTAL_ZIPS * POSITION_REWARDS.lattecoinsPerZip;

const PREVIEW_MISSION_COMPLETE = false;

// Utilitários
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createZips(count: number): Zip[] {
  const positions = Array.from(
    { length: 21 },
    (_, index) => index - 10
  );

  // Embaralhar coordenadas sem repetições
  for (let i = positions.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);

    [positions[i], positions[j]] = [
      positions[j],
      positions[i],
    ];
  }

  return positions.slice(0, count).map((position, index) => ({
    id: index,
    position,
    status: "armed",
    animationDelay: -(Math.random() * 4),
    animationDuration: 1.5 + Math.random() * 2,
  }));
}

// Detectar renderização no navegador
const subscribe = () => () => {};

const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Lógica principal da missão
function PositionGameClient() {
  // Estados
  const [dronePosition, setDronePosition] = useState(0);
  const [zips, setZips] = useState<Zip[]>(() => createZips(1));
  const [defeatedCount, setDefeatedCount] = useState(0);
  const [round, setRound] = useState(1);
  const [shot, setShot] = useState<Shot | null>(null);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [bombDistance, setBombDistance] = useState(0);
  const [rewardEffects, setRewardEffects] = useState<RewardEffect[]>([]);

  const showMissionComplete =
    missionCompleted ||
    (process.env.NODE_ENV === "development" &&
      PREVIEW_MISSION_COMPLETE);

  const processedShots = useRef<Set<string>>(new Set());
  const bombAreaRef = useRef<HTMLDivElement>(null);

  const isShooting = shot !== null;

  // Remover animações de recompensa concluídas
  const removeRewardEffect = useCallback((id: string) => {
    setRewardEffects((current) =>
      current.filter((effect) => effect.id !== id)
    );
  }, []);

  // Movimentação do drone
  const moveLeft = useCallback(() => {
    if (isShooting || showMissionComplete) return;

    setDronePosition((current) =>
      Math.max(-10, current - 1)
    );
  }, [isShooting, showMissionComplete]);

  const moveRight = useCallback(() => {
    if (isShooting || showMissionComplete) return;

    setDronePosition((current) =>
      Math.min(10, current + 1)
    );
  }, [isShooting, showMissionComplete]);

  // Disparar bomba
  const fire = useCallback(() => {
    if (isShooting || showMissionComplete) return;

    const area = bombAreaRef.current;
    if (!area) return;

    const isMobileLandscape =
      window.innerWidth < MOBILE_BREAKPOINT &&
      window.matchMedia("(orientation: landscape)").matches;

    // Dimensões responsivas da bomba
    const bombSize = isMobileLandscape
      ? MOBILE_BOMB_SIZE
      : DESKTOP_BOMB_SIZE;

    // Velocidade de queda conforme o dispositivo
    const bombSpeed = isMobileLandscape
      ? MOBILE_BOMB_SPEED
      : DESKTOP_BOMB_SPEED;

    // Distância percorrida pela bomba
    const distance = Math.max(
      0,
      area.getBoundingClientRect().height -
        bombSize +
        AXIS_OFFSET
    );

    // Duração proporcional à distância e à velocidade
    const fallDuration = (distance / bombSpeed) * 1000;

    setBombDistance(distance);

    setShot({
      id: crypto.randomUUID(),
      position: dronePosition,
      phase: "falling",
      bombSize,
      fallDuration,
    });
  }, [isShooting, showMissionComplete, dronePosition]);

  // Remover Zip após a animação de derrota
  const removeZip = useCallback((id: number) => {
    setZips((current) =>
      current.filter((zip) => zip.id !== id)
    );
  }, []);

  // Finalizar a queda da bomba
  const finishBombFall = () => {
    if (!shot || shot.phase !== "falling") return;

    if (processedShots.current.has(shot.id)) return;
    processedShots.current.add(shot.id);

    const target = zips.find(
      (zip) =>
        zip.position === shot.position &&
        zip.status === "armed"
    );

    if (target) {
      // Registrar XP e Lattecoins
      grantReward({
        id: `position:${shot.id}`,
        xp: POSITION_REWARDS.xpPerZip,
        lattecoins: POSITION_REWARDS.lattecoinsPerZip,
      });

      // Exibir animação de recompensa
      setRewardEffects((current) => [
        ...current,
        {
          id: shot.id,
          position: target.position,
          xp: POSITION_REWARDS.xpPerZip,
          lattecoins: POSITION_REWARDS.lattecoinsPerZip,
        },
      ]);

      // Marcar inimigo como derrotado
      setZips((current) =>
        current.map((zip) =>
          zip.id === target.id
            ? { ...zip, status: "defeated" }
            : zip
        )
      );

      // Atualizar progresso
      setDefeatedCount((current) => current + 1);
    }

    // Iniciar explosão
    setShot({
      ...shot,
      phase: "exploding",
    });
  };

  // Controles do teclado
  useEffect(() => {
    if (showMissionComplete) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(
            target.tagName
          ))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLeft();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveRight();
      }

      if (event.code === "Space") {
        event.preventDefault();

        if (event.repeat) return;
        fire();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight, fire, showMissionComplete]);

  // Encerrar a explosão após sua duração
  useEffect(() => {
    if (shot?.phase !== "exploding") return;

    const timer = window.setTimeout(() => {
      setShot(null);
    }, EXPLOSION_DURATION);

    return () => window.clearTimeout(timer);
  }, [shot]);

  // Avançar para a próxima rodada
  useEffect(() => {
    if (zips.length !== 0) return;
    if (shot !== null) return;

    if (missionCompleted || defeatedCount >= TOTAL_ZIPS) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextRound = round + 1;

      const quantity =
        nextRound <= 3
          ? nextRound
          : getRandomInt(1, 5);

      const remaining = TOTAL_ZIPS - defeatedCount;
      const finalQuantity = Math.min(quantity, remaining);

      setRound(nextRound);
      setZips(createZips(finalQuantity));
    }, NEXT_ROUND_DELAY);

    return () => window.clearTimeout(timer);
  }, [
    zips.length,
    shot,
    defeatedCount,
    round,
    missionCompleted,
  ]);

  // Verificar conclusão da missão
  useEffect(() => {
    if (
      defeatedCount < TOTAL_ZIPS ||
      zips.length !== 0 ||
      shot !== null ||
      missionCompleted
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setMissionCompleted(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [
    defeatedCount,
    zips.length,
    shot,
    missionCompleted,
  ]);

  return (
    <div className="relative flex min-h-90 min-w-0 flex-1 flex-col select-none max-lg:landscape:min-h-55">
      {/* Progresso da missão */}
      <div className="relative z-10 text-center text-text-primary max-lg:landscape:leading-tight">
        <p className="text-lg font-game text-tertiary max-lg:landscape:text-xs [-webkit-text-stroke:0.8px_black]">
          Zips derrotados: {defeatedCount}/{TOTAL_ZIPS}
        </p>

        <p className="text-sm max-lg:landscape:text-[11px]">
          Rodada {round}
        </p>
      </div>

      {/* Área de jogo e controles mobile */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col max-lg:landscape:flex-row max-lg:landscape:gap-3">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Área do drone */}
          <div className="relative min-h-35 flex-1 max-lg:landscape:min-h-27">
            {/* Painel de mira desktop */}
            {!showMissionComplete && (
              <DraggablePanel className="max-lg:landscape:hidden">
                <AimPanel
                  position={dronePosition}
                  onMoveLeft={moveLeft}
                  onMoveRight={moveRight}
                  onFire={fire}
                  isShooting={
                    isShooting || showMissionComplete
                  }
                />
              </DraggablePanel>
            )}

            {/* Drone */}
            <div className="pointer-events-none absolute inset-x-7.5 inset-y-0">
              <Drone position={dronePosition} />
            </div>

            {/* Área de queda da bomba */}
            <div
              ref={bombAreaRef}
              className="pointer-events-none absolute inset-x-7.5 top-12.5 bottom-0"
            >
              {shot?.phase === "falling" && (
                <div
                  key={shot.id}
                  className="absolute top-0 z-20"
                  style={
                    {
                      left: `${
                        ((shot.position + 10) / 20) * 100
                      }%`,
                      width: `${shot.bombSize}px`,
                      height: `${shot.bombSize}px`,
                      marginLeft: `${-shot.bombSize / 2}px`,
                      "--bomb-distance": `${bombDistance}px`,
                      animation: `bomb-fall ${shot.fallDuration}ms linear forwards`,
                    } as CSSProperties
                  }
                  onAnimationEnd={(event) => {
                    if (
                      event.target !== event.currentTarget
                    ) {
                      return;
                    }

                    finishBombFall();
                  }}
                >
                  <Image
                    src="/images/missions/position/bomb.svg"
                    alt="Bomba"
                    width={40}
                    height={40}
                    className="block h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Eixo X e inimigos */}
          <div className="relative mx-7.5 mb-8 translate-y-7.5 max-lg:landscape:mb-5 max-lg:landscape:translate-y-3">
            {/* Zips */}
            {zips.map((zip) => (
              <ZipEnemy
                key={`${round}-${zip.id}`}
                id={zip.id}
                position={zip.position}
                status={zip.status}
                animationDelay={zip.animationDelay}
                animationDuration={zip.animationDuration}
                onRemove={removeZip}
              />
            ))}

            {/* Animações de recompensa */}
            {rewardEffects.map((effect) => (
              <RewardPopup
                key={effect.id}
                id={effect.id}
                position={effect.position}
                xp={effect.xp}
                lattecoins={effect.lattecoins}
                onFinish={removeRewardEffect}
              />
            ))}

            {/* Explosão */}
            {shot?.phase === "exploding" && (
              <div
                key={shot.id}
                className="pointer-events-none absolute bottom-7.5 z-20 -translate-x-1/2"
                style={{
                  left: `${
                    ((shot.position + 10) / 20) * 100
                  }%`,
                  width: "100px",
                  height: "100px",
                  backgroundImage:
                    "url('/images/missions/position/explosion-spritesheet.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1000px 100px",
                  animation: `explosion-sprite ${EXPLOSION_DURATION}ms steps(10, end) forwards`,
                }}
              />
            )}

            {/* Eixo de coordenadas */}
            <PositionAxis />
          </div>
        </div>

        {/* Painel de mira mobile: mesmo design do desktop */}
        {!showMissionComplete && (
          <aside
            className="
              hidden
              shrink-0
              self-center
              max-lg:landscape:block
              max-lg:landscape:w-[clamp(140px,20vw,210px)]
            "
            aria-label="Controles de mira"
          >
            <AimPanel
              variant="mobile"
              position={dronePosition}
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onFire={fire}
              isShooting={
                isShooting || showMissionComplete
              }
            />
          </aside>
        )}
      </div>

      {/* Tela de conclusão */}
      {showMissionComplete && (
        <MissionComplete
          defeatedEnemies={TOTAL_ZIPS}
          xp={TOTAL_XP}
          lattecoins={TOTAL_LATTECOINS}
          nextMissionHref="#"
        />
      )}
    </div>
  );
}

// Componente exportado para o Next.js
export default function PositionGame() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) return null;

  return <PositionGameClient />;
}
