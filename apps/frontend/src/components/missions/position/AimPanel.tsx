"use client";

import { useState } from "react";
import Image from "next/image";

interface AimPanelProps {
  position: number;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onFire: () => void;
}

export default function AimPanel({
  position,
  onMoveLeft,
  onMoveRight,
  onFire,
}: AimPanelProps) {
  const assets = "/images/missions/position";
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-87.5 select-none">
      {isOpen ? (
        <>
          {/* Estrutura do painel aberto */}
          <Image
            src={`${assets}/aim-panel-base.svg`}
            alt="Sistema de mira"
            width={550}
            height={750}
            className="pointer-events-none h-auto w-full"
            draggable={false}
            priority
          />

          {/* Botão fechar */}
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

          {/* Visor da coordenada */}
          <div className="pointer-events-none absolute left-[23%] top-[62%] flex h-[10%] w-[28%] items-center justify-center">
            <span className="text-3xl font-bold text-[#aaff00]">
              {position}
            </span>
          </div>

          {/* Botão esquerda */}
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={position <= -10}
            aria-label="Mover drone para esquerda"
            className="absolute z-20 left-[51%] top-[61%] w-[12%] cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
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
            onClick={onMoveRight}
            disabled={position >= 10}
            aria-label="Mover drone para direita"
            className="absolute z-20 left-[65%] top-[61%] w-[12%] cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
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
            aria-label="Disparar bomba"
            className="absolute z-10 left-[20%] top-[60%] w-[59%] cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
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
        </>
      ) : (
        <>
          {/* Estrutura do painel fechado */}
          <Image
            src={`${assets}/closed-aim-panel-base.svg`}
            alt="Sistema de mira fechado"
            width={550}
            height={750}
            className="pointer-events-none h-auto w-[65%]"
            draggable={false}
          />

          {/* Botão abrir */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir painel de mira"
            className="absolute right-[39%] top-[23%] z-30 w-[8%] cursor-pointer transition-transform hover:scale-110 active:scale-95"
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
        </>
      )}
    </div>
  );
}
