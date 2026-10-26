"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";

interface AimPanelProps {
  position: number;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onFire: () => void;
  isShooting: boolean;
  variant?: "desktop" | "mobile";
}

type Direction = "left" | "right";

// Configurações da movimentação contínua
const HOLD_DELAY = 300;
const MOVE_INTERVAL = 120;

export default function AimPanel({
  position,
  onMoveLeft,
  onMoveRight,
  onFire,
  isShooting,
  variant = "desktop",
}: AimPanelProps) {
  const assets = "/images/missions/position";

  const isMobile = variant === "mobile";

  const [isOpen, setIsOpen] = useState(true);

  // Referências para movimentação contínua
  const holdTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const moveIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  const activePointerRef = useRef<number | null>(null);

  const positionRef = useRef(position);
  const isShootingRef = useRef(isShooting);

  const moveLeftRef = useRef(onMoveLeft);
  const moveRightRef = useRef(onMoveRight);

  // Manter as referências sincronizadas com as propriedades
  useEffect(() => {
    positionRef.current = position;
    isShootingRef.current = isShooting;

    moveLeftRef.current = onMoveLeft;
    moveRightRef.current = onMoveRight;
  }, [position, isShooting, onMoveLeft, onMoveRight]);

  // Interromper movimentação
  const stopMoving = useCallback(() => {
    if (holdTimeoutRef.current !== null) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    if (moveIntervalRef.current !== null) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }

    activePointerRef.current = null;
  }, []);

  // Executar um passo
  const moveStep = useCallback(
    (direction: Direction): boolean => {
      if (isShootingRef.current) {
        stopMoving();
        return false;
      }

      const currentPosition = positionRef.current;

      if (direction === "left" && currentPosition <= -10) {
        stopMoving();
        return false;
      }

      if (direction === "right" && currentPosition >= 10) {
        stopMoving();
        return false;
      }

      positionRef.current =
        direction === "left"
          ? currentPosition - 1
          : currentPosition + 1;

      if (direction === "left") {
        moveLeftRef.current();
      } else {
        moveRightRef.current();
      }

      return true;
    },
    [stopMoving]
  );

  // Iniciar movimentação
  const startMoving = useCallback(
    (
      event: PointerEvent<HTMLButtonElement>,
      direction: Direction
    ) => {
      if (event.button !== 0 || isShootingRef.current) {
        return;
      }

      event.preventDefault();

      if (activePointerRef.current !== null) {
        return;
      }

      activePointerRef.current = event.pointerId;

      event.currentTarget.setPointerCapture(event.pointerId);

      // Primeiro movimento imediato
      const moved = moveStep(direction);

      if (!moved) return;

      // Iniciar repetição após o tempo de espera
      holdTimeoutRef.current = setTimeout(() => {
        holdTimeoutRef.current = null;

        moveIntervalRef.current = setInterval(() => {
          moveStep(direction);
        }, MOVE_INTERVAL);
      }, HOLD_DELAY);
    },
    [moveStep]
  );

  // Encerrar movimentação
  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (activePointerRef.current !== event.pointerId) {
        return;
      }

      stopMoving();

      if (
        event.currentTarget.hasPointerCapture(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(
          event.pointerId
        );
      }
    },
    [stopMoving]
  );

  // Parar movimentação durante disparos
  useEffect(() => {
    if (isShooting) {
      stopMoving();
    }
  }, [isShooting, stopMoving]);

  // Limpar timers ao desmontar
  useEffect(() => {
    return () => {
      stopMoving();
    };
  }, [stopMoving]);

  // Eventos compartilhados dos botões
  const getMovementProps = (direction: Direction) => ({
    onPointerDown: (
      event: PointerEvent<HTMLButtonElement>
    ) => startMoving(event, direction),

    onPointerUp: handlePointerUp,

    onPointerCancel: handlePointerUp,

    onLostPointerCapture: () => stopMoving(),

    onContextMenu: (
      event: React.MouseEvent<HTMLButtonElement>
    ) => event.preventDefault(),
  });

  return (
    <div
      className={
        isMobile
          ? "relative w-full select-none"
          : "relative w-87.5 select-none"
      }
    >
      {/* =====================================================
          PAINEL ABERTO
      ===================================================== */}

      <div
        className={`relative w-full origin-top-left transition-all duration-500 ease-in-out ${
          isOpen
            ? "z-10 scale-100 opacity-100"
            : "pointer-events-none z-0 scale-[0.98] opacity-0"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Imagem base */}
        <Image
          src={`${assets}/aim-panel-base.svg`}
          alt="Sistema de mira"
          width={550}
          height={750}
          className="pointer-events-none block h-auto w-full"
          draggable={false}
          priority
        />

        {/* Fechar painel: somente desktop */}
        {!isMobile && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar painel de mira"
            className="absolute right-[17%] top-[5%] z-30 w-[9%] cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <Image
              src={`${assets}/close.svg`}
              alt=""
              width={50}
              height={50}
              className="pointer-events-none h-auto w-full"
              draggable={false}
            />
          </button>
        )}

        {/* Radar */}
        <div className="pointer-events-none absolute left-[33%] top-[18%] w-[33%]">
          <Image
            src={`${assets}/radar.svg`}
            alt="Radar"
            width={260}
            height={260}
            className="h-auto w-full"
            draggable={false}
          />
        </div>

        {/* Visor de posição */}
        <div className="pointer-events-none absolute left-[23%] top-[62%] flex h-[10%] w-[28%] items-center justify-center">
          <span
            className={
              isMobile
                ? "font-bold text-secondary text-[clamp(12px,2.5vw,13px)]"
                : "text-3xl font-bold text-secondary"
            }
          >
            {position}
          </span>
        </div>

        {/* Botão esquerda */}
        <button
          type="button"
          {...getMovementProps("left")}
          disabled={isShooting || position <= -10}
          aria-label="Mover drone para esquerda"
          className="absolute z-20 left-[51%] top-[61%] w-[12%] touch-none cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image
            src={`${assets}/btn-left.svg`}
            alt=""
            width={80}
            height={80}
            className="pointer-events-none h-auto w-full"
            draggable={false}
          />
        </button>

        {/* Botão direita */}
        <button
          type="button"
          {...getMovementProps("right")}
          disabled={isShooting || position >= 10}
          aria-label="Mover drone para direita"
          className="absolute z-20 left-[65%] top-[61%] w-[12%] touch-none cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image
            src={`${assets}/btn-right.svg`}
            alt=""
            width={80}
            height={80}
            className="pointer-events-none h-auto w-full"
            draggable={false}
          />
        </button>

        {/* Botão disparar */}
        <button
          type="button"
          onClick={onFire}
          disabled={isShooting}
          aria-label="Disparar bomba"
          className="absolute z-10 left-[20%] top-[60%] w-[59%] cursor-pointer transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image
            src={`${assets}/btn-fire.svg`}
            alt=""
            width={400}
            height={110}
            className="pointer-events-none h-auto w-full"
            draggable={false}
          />
        </button>
      </div>

      {/* =====================================================
          PAINEL FECHADO: SOMENTE DESKTOP
      ===================================================== */}

      {!isMobile && (
        <div
          className={`absolute left-13 top-0 w-full origin-top-left transition-all duration-300 ease-in-out ${
            isOpen
              ? "pointer-events-none z-0 scale-[0.98] opacity-0"
              : "z-10 scale-100 opacity-100"
          }`}
          aria-hidden={isOpen}
          inert={isOpen}
        >
          <Image
            src={`${assets}/closed-aim-panel-base.svg`}
            alt="Sistema de mira fechado"
            width={550}
            height={750}
            className="pointer-events-none block h-auto w-[73%]"
            draggable={false}
          />

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir painel de mira"
            className="absolute right-[31%] top-[23%] z-30 w-[9%] cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <Image
              src={`${assets}/open.svg`}
              alt=""
              width={50}
              height={50}
              className="pointer-events-none h-auto w-full"
              draggable={false}
            />
          </button>
        </div>
      )}
    </div>
  );
}
