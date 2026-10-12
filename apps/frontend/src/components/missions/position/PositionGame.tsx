"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import AimPanel from "./AimPanel";
import DraggablePanel from "./DraggablePanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";

type Shot = {
  id: number;
  position: number;
  phase: "falling" | "exploding";
};

const FALL_DURATION = 900;
const EXPLOSION_DURATION = 500;

export default function PositionGame() {
  const [dronePosition, setDronePosition] = useState(0);
  const [zipDefeated, setZipDefeated] = useState(false);
  const [shot, setShot] = useState<Shot | null>(null);

  const zipPosition = 5;
  const isShooting = shot !== null;

  // Movimentação horizontal
  const moveLeft = useCallback(() => {
    if (isShooting) return;

    setDronePosition((current) =>
      Math.max(-10, current - 1)
    );
  }, [isShooting]);

  const moveRight = useCallback(() => {
    if (isShooting) return;

    setDronePosition((current) =>
      Math.min(10, current + 1)
    );
  }, [isShooting]);

  // Disparo
  const fire = useCallback(() => {
    if (isShooting) return;

    setShot({
      id: Date.now(),
      position: dronePosition,
      phase: "falling",
    });
  }, [isShooting, dronePosition]);

  
  // Controles do teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Evita atalhos enquanto o usuário digita em um campo
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

        // Evita disparos repetidos ao segurar a tecla
        if (event.repeat) return;

        fire();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight, fire]);


  // Controlar queda e explosão
  useEffect(() => {
    if (!shot) return;

    if (shot.phase === "falling") {
      const timer = window.setTimeout(() => {
        if (shot.position === zipPosition) {
          setZipDefeated(true);
        }

        setShot({
          ...shot,
          phase: "exploding",
        });
      }, FALL_DURATION);

      return () => window.clearTimeout(timer);
    }

    if (shot.phase === "exploding") {
      const timer = window.setTimeout(() => {
        setShot(null);
      }, EXPLOSION_DURATION);

      return () => window.clearTimeout(timer);
    }
  }, [shot]);

  return (
    <div className="relative flex min-h-90 min-w-0 flex-1 flex-col">

      {/* Área do drone */}
      <div className="relative flex-1">

        {/* Painel de mira */}
        <DraggablePanel>
          <AimPanel
            position={dronePosition}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onFire={fire}
            isShooting={isShooting}
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

      {/* Eixo X e inimigo */}
      <div className="relative mx-7.5 mb-8 translate-y-7.5">

        {/* Zip */}
        {!zipDefeated && (
          <div
            className="absolute bottom-7.5 -translate-x-1/2"
            style={{
              left: `${((zipPosition + 10) / 20) * 100}%`,
            }}
          >
            <Image
              src="/images/assets/enemies/zip-armed.svg"
              alt="Inimigo Zip"
              width={70}
              height={70}
            />
          </div>
        )}

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

        <PositionAxis />
      </div>
    </div>
  );
}

