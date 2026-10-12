"use client";

import { useEffect } from "react";
import Image from "next/image";

interface ZipEnemyProps {
  id: number;
  position: number;
  status: "armed" | "defeated";
  animationDelay: number;
  animationDuration: number;
  onRemove: (id: number) => void;
}

const DEFEATED_DURATION = 2000;

export default function ZipEnemy({
  id,
  position,
  status,
  animationDelay,
  animationDuration,
  onRemove,
}: ZipEnemyProps) {
  useEffect(() => {
    if (status !== "defeated") return;

    const timer = window.setTimeout(() => {
      onRemove(id);
    }, DEFEATED_DURATION);

    return () => window.clearTimeout(timer);
  }, [status, id, onRemove]);

  return (
    <div
      className="absolute bottom-7.5 -translate-x-1/2"
      style={{
        left: `${((position + 10) / 20) * 100}%`,
        width: "70px",
        height: "70px",
      }}
    >
      {status === "armed" ? (
        <Image
          src="/images/assets/enemies/zip-armed.svg"
          alt="Inimigo Zip"
          width={70}
          height={70}
          className="block h-full w-full object-contain"
          style={{
            animationName: "zip-turn",
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
            animationTimingFunction: "steps(1, end)",
            animationIterationCount: "infinite",
          }}
        />
      ) : (
        <Image
          src="/images/assets/enemies/zip-defeated.svg"
          alt="Zip derrotado"
          width={70}
          height={70}
          className="block h-full w-full object-contain"
        />
      )}
    </div>
  );
}
