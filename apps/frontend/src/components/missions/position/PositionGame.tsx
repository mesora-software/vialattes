"use client";

import Image from "next/image";
import AimPanel from "./AimPanel";
import Drone from "./Drone";
import PositionAxis from "./PositionAxis";

export default function PositionGame() {
  const dronePosition = 0;
  const zipPosition = 5;

  return (
    <div className="relative flex min-h-[500px] flex-1 flex-col">
      {/* Área do drone e painel */}
      <div className="relative flex-1">
        {/* Painel de mira */}
        <div className="absolute left-0 top-1/2 z-20 -translate-y-1/2">
          <AimPanel position={dronePosition} />
        </div>

        {/* Área horizontal do jogo */}
        <div className="absolute inset-x-[160px] inset-y-0">
          <Drone position={dronePosition} />
        </div>
      </div>

      {/* Eixo X e inimigo */}
      <div className="relative mx-[160px] mb-8">
        <div
          className="absolute bottom-[42px] -translate-x-1/2"
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
