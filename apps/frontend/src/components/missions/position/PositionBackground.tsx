
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UFOAnimation from "./UFOAnimation";
import BuildingSmoke from "./BuildingSmoke";
import BuildingFire from "./BuildingFire";
import BackgroundDrones from "./BackgroundDrones";

const BACKGROUND_WIDTH = 1366;
const BACKGROUND_HEIGHT = 768;

// Coordenadas relativas à imagem original
const UFO = {
  left: 68.8,
  top: 31.9,
  width: 15,
};

const BEAM = {
  left: 68.8,
  top: 39,
  width: 5.5,
};

// Fontes de fumaça ambiental
const SMOKE_SOURCES = [
  // Fumaças distantes
  { id: 1, left: 21, top: 70, width: 55, duration: 7.5, delay: 0, opacity: 0.65 },
  { id: 2, left: 35, top: 67, width: 60, duration: 8, delay: 1.3, opacity: 0.7 },
  { id: 3, left: 49, top: 73, width: 65, duration: 7, delay: 2.1, opacity: 0.75 },

  // Fumaças próximas
  { id: 4, left: 62, top: 75, width: 85, duration: 6, delay: 0.8, opacity: 0.95 },
  { id: 5, left: 77, top: 70, width: 90, duration: 6.5, delay: 3.2, opacity: 0.95 },
];


const FIRE_SOURCES = [
  { id: 1, left: 39, top: 76, width: 45, duration: 2.5, delay: 0, },
  { id: 2, left: 64.5, top: 73, width: 40, duration: 2.8, delay: 1.2,},
];


type SceneSize = {
  width: number;
  height: number;
};

export default function PositionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerSize, setContainerSize] =
    useState<SceneSize | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      const { width, height } = entry.contentRect;

      setContainerSize((current) => {
        if (
          current?.width === width &&
          current?.height === height
        ) {
          return current;
        }

        return { width, height };
      });
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Escala proporcional ao contêiner
  const scale = containerSize
    ? Math.max(
        containerSize.width / BACKGROUND_WIDTH,
        containerSize.height / BACKGROUND_HEIGHT
      )
    : 1;

  const scaledWidth = BACKGROUND_WIDTH * scale;
  const scaledHeight = BACKGROUND_HEIGHT * scale;

  // Centralização horizontal e alinhamento inferior
  const offsetX = containerSize
    ? (containerSize.width - scaledWidth) / 2
    : 0;

  const offsetY = containerSize
    ? containerSize.height - scaledHeight
    : 0;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
    >
      {/* Superfície compartilhada do cenário */}
      {containerSize && (
        <div
          className="absolute"
          style={{
            width: BACKGROUND_WIDTH,
            height: BACKGROUND_HEIGHT,
            left: offsetX,
            top: offsetY,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Cenário estático */}
          <Image
            src="/images/missions/position/background-clean.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-fill"
            draggable={false}
          />

          { /* Drones distantes voando pelo cenário */ }
          <BackgroundDrones />

          {/* Disco voador */}
          <div
            className="absolute"
            style={{
              left: `${UFO.left}%`,
              top: `${UFO.top}%`,
              width: `${UFO.width}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <UFOAnimation />
          </div>

          {/* Feixe luminoso */}
          <div
            className="absolute"
            style={{
              left: `${BEAM.left}%`,
              top: `${BEAM.top}%`,
              width: `${BEAM.width}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Feixe original com pulsação */}
            <Image
              src="/images/missions/position/ufo-beam.png"
              alt=""
              width={307}
              height={540}
              className="ufo-beam-pulse block h-auto w-full mask-[linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]"
              draggable={false}
            />

            {/* Energia luminosa subindo */}
            <div
              className="ufo-beam-energy pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              }}
            >
              <div className="ufo-beam-energy-wave absolute inset-x-0" />
            </div>
          </div>

          {/* Fumaça ambiental distribuída pelo cenário */}
          {SMOKE_SOURCES.map((smoke) => (
            <div
              key={smoke.id}
              className="absolute"
              style={{
                left: `${smoke.left}%`,
                top: `${smoke.top}%`,
                opacity: smoke.opacity,
              }}
            >
              <BuildingSmoke
                width={smoke.width}
                duration={smoke.duration}
                delay={smoke.delay}
              />
            </div>
          ))}

          {/* Incêndios localizados nos prédios */}
          {FIRE_SOURCES.map((fire) => (
            <div
              key={fire.id}
              className="absolute"
              style={{
                left: `${fire.left}%`,
                top: `${fire.top}%`,
              }}
            >
              <BuildingFire
                width={fire.width}
                duration={fire.duration}
                delay={fire.delay}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

