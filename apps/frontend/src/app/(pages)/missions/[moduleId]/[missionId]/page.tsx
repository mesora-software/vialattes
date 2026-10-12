"use client";

import Image from "next/image";
import Link from "next/link";
import HudValue from "@/components/dashboard/HudValue";
import PositionGame from "@/components/missions/position/PositionGame";
import { usePlayerWallet } from "@/hooks/usePlayerWallet";

export default function MissionPage() {
  const wallet = usePlayerWallet();

  return (
    <main className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-black">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-position-[center_100%] bg-no-repeat opacity-90"
        style={{
          backgroundImage:
            "url('/images/missions/position/background.png')",
        }}
      />

      <div className="relative z-10 mx-20 my-2.5 flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Image
            src="/images/assets/patents/recruit.svg"
            alt="Recruta"
            width={90}
            height={90}
          />

          <div className="flex items-center gap-10 -translate-y-8">
            <HudValue
              icon="/images/assets/ui/xp.svg"
              alt="Experiência"
              value={wallet.xp}
            />

            <HudValue
              icon="/images/assets/ui/lattecoin.svg"
              alt="Lattecoins"
              value={wallet.lattecoins}
            />
          </div>

          <Link
            href="/dashboard"
            className="text-xl font-bold text-[#fdd501] -translate-y-8 hover:underline"
          >
            ← Sair da missão
          </Link>
        </header>

        {/* Identificação da missão */}
        <section className="mt-8 text-start font-bold">
          <h1
            className="text-3xl text-[#fdd501]"
            style={{ fontFamily: '"Posey", cursive' }}
          >
            Cinemática • Posição
          </h1>

          <p
            className="mt-3 text-lg font-bold text-[#faf8f1]"
            style={{ fontFamily: '"Posey", cursive' }}
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

