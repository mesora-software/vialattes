"use client";

import { useState } from "react";
import Image from "next/image";

interface AimPanelProps {
  position: number;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onFire: () => void;
  isShooting: boolean;
  variant?: "desktop" | "mobile";
}

export default function AimPanel({
  position,
  onMoveLeft,
  onMoveRight,
  onFire,
  isShooting,
  variant = "desktop",
}: AimPanelProps) {
  const assets = "/images/missions/position";
  const [isOpen, setIsOpen] = useState(true);

  if (variant === "mobile") {
    return (
      <div className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-game-panel-edge bg-primary-dark/95 p-2 text-center shadow-[0_0_16px_#7458a966] select-none">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-game text-[11px] text-tertiary">
            SISTEMA DE MIRA
          </span>

          <Image
            src={`${assets}/radar.svg`}
            alt="Radar"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            draggable={false}
          />
        </div>

        <output
          aria-label="Posição atual do drone"
          className="w-full rounded-md border border-game-panel-edge bg-primary-dark py-1 font-game text-2xl
          text-secondary"
        >
          {position}
        </output>

        <div className="flex w-full items-center justify-center gap-3">
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={isShooting || position <= -10}
            aria-label="Mover drone para esquerda"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-primary-dark active:scale-95 disabled:opacity-40"
          >
            <Image
              src={`${assets}/btn-left.svg`}
              alt=""
              width={40}
              height={40}
              draggable={false}
            />
          </button>

          <button
            type="button"
            onClick={onMoveRight}
            disabled={isShooting || position >= 10}
            aria-label="Mover drone para direita"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-primary-dark active:scale-95 disabled:opacity-40"
          >
            <Image
              src={`${assets}/btn-right.svg`}
              alt=""
              width={40}
              height={40}
              draggable={false}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={onFire}
          disabled={isShooting}
          aria-label="Disparar bomba"
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-primary-dark px-2 active:scale-95 disabled:opacity-40"
        >
          <Image
            src={`${assets}/btn-fire.svg`}
            alt="Disparar"
            width={140}
            height={44}
            className="h-10 w-auto max-w-full object-contain"
            draggable={false}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-87.5 select-none">
      {/* PAINEL ABERTO */}
      <div
        className={`relative w-full origin-top-left transition-all duration-500 ease-in-out ${
          isOpen
            ? "z-10 scale-100 opacity-100"
            : "pointer-events-none z-0 scale-[0.98] opacity-0"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Estrutura do painel aberto */}
        <Image
          src={`${assets}/aim-panel-base.svg`}
          alt="Sistema de mira"
          width={550}
          height={750}
          className="pointer-events-none block h-auto w-full"
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
          <span className="text-3xl font-bold text-secondary">
            {position}
          </span>
        </div>

        {/* Botão esquerda */}
        <button
          type="button"
          onClick={onMoveLeft}
          disabled={isShooting || position <= -10}
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
          disabled={isShooting || position >= 10}
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
          disabled={isShooting}
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
      </div>

      {/* PAINEL FECHADO */}
      <div
        className={`absolute left-13 top-0 w-full origin-top-left transition-all duration-300 ease-in-out ${
          isOpen
            ? "pointer-events-none z-0 scale-[0.98] opacity-0"
            : "z-10 scale-100 opacity-100"
        }`}
        aria-hidden={isOpen}
        inert={isOpen}
      >
        {/* Estrutura do painel fechado */}
        <Image
          src={`${assets}/closed-aim-panel-base.svg`}
          alt="Sistema de mira fechado"
          width={550}
          height={750}
          className="pointer-events-none block h-auto w-[73%]"
          draggable={false}
        />

        {/* Botão abrir */}
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
    </div>
  );
}
