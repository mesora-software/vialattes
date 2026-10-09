"use client";

import Image from "next/image";
import AimPanel from "./AimPanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";

export default function PositionGame() {
  const dronePosition = 0;
  const zipPosition = 5;

  return (
    <div className="relative flex min-h-90 min-w-0 flex-1 flex-col ">
      {/* Área do drone e painel */}
      <div className="relative flex-1">
        {/* Painel de mira */}
        <div className="absolute left-0 top-1/2 z-20 -translate-y-1/2">
          <AimPanel position={dronePosition} />
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
            width={80}
            height={80}
          />
        </div>

        <PositionAxis />
      </div>
    </div>
  );
}
