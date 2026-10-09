"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import AimPanel from "./AimPanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";

export default function PositionGame() {
  const [dronePosition, setDronePosition] = useState(0);
  const zipPosition = 5;

  // Movimentação horizontal
  const moveLeft = useCallback(() => {
    setDronePosition((current) => Math.max(-10, current - 1));
  }, []);

  const moveRight = useCallback(() => {
    setDronePosition((current) => Math.min(10, current + 1));
  }, []);

  // Disparo: implementaremos a bomba na próxima etapa
  const fire = () => {
    console.log("Disparo na coordenada:", dronePosition);
  };

  // Controles do teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLeft();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight]);

  return (
    <div className="relative flex min-h-90 min-w-0 flex-1 flex-col">
      {/* Área do drone e painel */}
      <div className="relative flex-1">
        {/* Painel de mira à direita */}
        <div className="absolute right-0 top-17.5 z-30 -translate-y-1/2">
          <AimPanel
            position={dronePosition}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onFire={fire}
          />
        </div>

        {/* Área horizontal do jogo */}
        <div className="absolute inset-x-7.5 inset-y-0">
          <Drone position={dronePosition} />
        </div>
      </div>

      {/* Eixo X e inimigo */}
      <div className="relative mx-7.5 mb-8 translate-y-7.5">
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

        <PositionAxis />
      </div>
    </div>
  );
}

