"use client";

import Image from "next/image";
import Link from "next/link";
import HudValue from "@/components/ui/HudValue";
import PositionGame from "@/components/missions/position/PositionGame";
import { usePlayerWallet } from "@/hooks/usePlayerWallet";

export default function MissionPage() {
  const wallet = usePlayerWallet();

  return (
    <main className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-black">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-position-[center_100%] bg-no-repeat opacity-60"
        style={{
          backgroundImage:
            "url('/images/missions/position/background.png')",
        }}
      />

      <div className="relative z-10 mx-20 my-2.5 flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between select-none">
          <Image
            src="/images/assets/patents/recruit.svg"
            alt="Recruta"
            width={90}
            height={90}
          />

          {/* XP */ }
          <div className="flex items-center gap-10 -translate-y-8">
            <HudValue
              icon="/images/assets/ui/xp.svg"
              alt="Experiência"
              value={wallet.xp}
            />

            {/* Lattecoins */ }
            <HudValue
              icon="/images/assets/ui/lattecoin.svg"
              alt="Lattecoins"
              value={wallet.lattecoins}
            />
          </div>

          <Link
            href="/dashboard"
            className="text-xl font-game text-tertiary -translate-y-8 hover:underline hover:scale-105"
          >
            ← Sair da missão
          </Link>
        </header>

        {/* Identificação da missão */}
        <section className="mt-8 text-start select-none">
          <h1
            className="text-4xl font-game text-tertiary [-webkit-text-stroke:1.5px_black]"
          >
            Cinemática • Posição
          </h1>

          <p
            className="mt-2 text-xl font-body text-text-primary"
          >
            Determine a posição de cada Zip e acerte o disparo.
          </p>
        </section>

        {/* Jogo */}
        <PositionGame />
      </div>
    </main>
  );
}

