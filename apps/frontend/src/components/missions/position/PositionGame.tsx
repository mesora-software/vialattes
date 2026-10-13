"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";

import AimPanel from "./AimPanel";
import DraggablePanel from "./DraggablePanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";
import ZipEnemy from "./ZipEnemy";
import RewardPopup from "./RewardPopup";
import GamePanel from "@/components/ui/GamePanel";

import { POSITION_REWARDS } from "@/lib/rewards/reward-config";
import { grantReward } from "@/lib/rewards/reward-storage";

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
const TOTAL_XP = TOTAL_ZIPS * POSITION_REWARDS.xpPerZip;
const TOTAL_LATTECOINS = TOTAL_ZIPS * POSITION_REWARDS.lattecoinsPerZip;

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

  const [rewardEffects, setRewardEffects] = useState<RewardEffect[]>([]);

  // Evitar processamento duplicado de impactos
  const processedShots = useRef<Set<string>>(new Set());

  const isShooting = shot !== null;

  // Remover animações de recompensa concluídas
  const removeRewardEffect = useCallback((id: string) => {
    setRewardEffects((current) =>
      current.filter((effect) => effect.id !== id)
    );
  }, []);

  // Movimentação do drone
  const moveLeft = useCallback(() => {
    if (isShooting || missionCompleted) return;

    setDronePosition((current) =>
      Math.max(-10, current - 1)
    );
  }, [isShooting, missionCompleted]);

  const moveRight = useCallback(() => {
    if (isShooting || missionCompleted) return;

    setDronePosition((current) =>
      Math.min(10, current + 1)
    );
  }, [isShooting, missionCompleted]);

  // Disparar bomba
  const fire = useCallback(() => {
    if (isShooting || missionCompleted) return;

    setShot({
      id: crypto.randomUUID(),
      position: dronePosition,
      phase: "falling",
    });
  }, [isShooting, missionCompleted, dronePosition]);

  // Remover Zip após a animação de derrota
  const removeZip = useCallback((id: number) => {
    setZips((current) =>
      current.filter((zip) => zip.id !== id)
    );
  }, []);

  // Finalizar a queda da bomba
  const finishBombFall = () => {
    if (!shot || shot.phase !== "falling") return;

    // Impedir que o mesmo impacto seja processado duas vezes
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
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
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
  }, [moveLeft, moveRight, fire]);

  // Finalizar a explosão
  useEffect(() => {
    if (!shot || shot.phase !== "exploding") return;

    const timer = window.setTimeout(() => {
      setShot(null);
    }, EXPLOSION_DURATION);

    return () => window.clearTimeout(timer);
  }, [shot]);

  // Avançar para a próxima rodada
  useEffect(() => {
    // Aguardar todos os inimigos desaparecerem
    if (zips.length !== 0) return;

    // Aguardar o término da explosão
    if (shot !== null) return;

    // Não criar inimigos após a conclusão
    if (missionCompleted || defeatedCount >= TOTAL_ZIPS) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextRound = round + 1;

      // Primeiras rodadas: 1, 2 e 3 inimigos
      // Rodadas seguintes: 1 a 5 inimigos
      const quantity =
        nextRound <= 3
          ? nextRound
          : getRandomInt(1, 5);

      // Respeitar o limite de 20 inimigos
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
    <div className="relative flex min-h-90 min-w-0 flex-1 flex-col">

      {/* Progresso da missão */}
      <div className="relative z-10 text-center text-white">
        <p className="text-lg font-bold">
          Zips derrotados: {defeatedCount}/{TOTAL_ZIPS}
        </p>

        <p className="text-sm">
          Rodada {round}
        </p>
      </div>

      {/* Área do drone */}
      <div className="relative flex-1">

        {/* Painel de mira */}
        <DraggablePanel>
          <AimPanel
            position={dronePosition}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onFire={fire}
            isShooting={isShooting || missionCompleted}
          />
        </DraggablePanel>

        {/* Drone */}
        <div className="pointer-events-none absolute inset-x-7.5 inset-y-0">
          <Drone position={dronePosition} />
        </div>

        {/* Bomba em queda */}
        {shot?.phase === "falling" && (
          <div
            key={shot.id}
            className="pointer-events-none absolute inset-x-7.5 top-12.5 bottom-0"
          >
            <div
              className="absolute top-0 z-20 -translate-x-1/2 animate-[bomb-fall_900ms_linear_forwards]"
              style={{
                left: `${((shot.position + 10) / 20) * 100}%`,
                width: "40px",
                height: "40px",
              }}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) {
                  finishBombFall();
                }
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
          </div>
        )}
      </div>

      {/* Eixo X e inimigos */}
      <div className="relative mx-7.5 mb-8 translate-y-7.5">

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
            className="pointer-events-none absolute bottom-7.5 z-20 -translate-x-1/2"
            style={{
              left: `${((shot.position + 10) / 20) * 100}%`,
              width: "100px",
              height: "100px",
            }}
          >
            <Image
              src="/images/missions/position/explosion.svg"
              alt="Explosão"
              width={100}
              height={100}
              className="block h-full w-full object-contain"
            />
          </div>
        )}

        {/* Eixo de coordenadas */}
        <PositionAxis />
      </div>
  
      {/* Tela de conclusão */}
      {missionCompleted && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4">
          <GamePanel
            className="w-full max-w-md shadow-2xl"
            contentClassName="flex-col gap-5 px-8 py-10 text-center"
          >
            {/* Título */}
            <h2 className="text-3xl font-bold text-[#fdd501]">
              Missão concluída!
            </h2>

            {/* Progresso */}
            <p className="text-lg text-white">
              Você derrotou {TOTAL_ZIPS} Zips!
            </p>

            {/* Recompensas */}
            <div className="flex w-full flex-col items-center gap-3">
              <h3 className="text-xl text-[#fdd501]">
                Recompensas obtidas
              </h3>

              <div className="flex items-center justify-center gap-8">
                {/* XP */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/assets/ui/xp.svg"
                    alt="Experiência"
                    width={30}
                    height={30}
                  />

                  <span className="text-xl text-[#fdd501]">
                    +{TOTAL_XP.toLocaleString("pt-BR")}
                  </span>
                </div>

                {/* Lattecoins */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/assets/ui/lattecoin.svg"
                    alt="Lattecoins"
                    width={30}
                    height={30}
                  />

                  <span className="text-xl text-[#fdd501]">
                    +{TOTAL_LATTECOINS.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Voltar ao Dashboard */}
            <Link
              href="/dashboard"
              className="
                mt-3
                cursor-pointer
                rounded-lg
                border-2
                border-[#fdd501]
                bg-[#402e6a]
                px-6
                py-3
                text-lg
                font-bold
                text-[#fdd501]
                transition-all
                duration-200
                hover:scale-105
                hover:bg-[#5a4388]
              "
            >
              Voltar ao Dashboard
            </Link>
          </GamePanel>
        </div>
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

  // Gerar posições aleatórias somente no navegador
  if (!mounted) return null;

  return <PositionGameClient />;
}



