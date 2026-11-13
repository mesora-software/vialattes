"use client";

import Image from "next/image";
import HudValue from "@/components/ui/HudValue";
import AnimatedUnderlineLink from "@/components/ui/AnimatedUnderlineLink";
import { usePlayerWallet } from "@/hooks/usePlayerWallet";
import type { MissionDefinition } from "@/lib/missions/mission-registry";
import MissionRenderer from "./MissionRenderer";

type MissionLayoutProps = {
  mission: MissionDefinition;
};

export default function MissionLayout({ mission }: MissionLayoutProps) {
  const wallet = usePlayerWallet();

  return (
    <main className="relative flex min-h-dvh w-full max-w-full flex-col overflow-x-clip bg-black">
      <MissionRenderer game={mission.game} section="background" />

      <div className="relative z-10 mx-4 my-2 flex min-w-0 flex-1 flex-col sm:mx-8 lg:mx-20 lg:my-2.5 max-lg:landscape:mx-4 max-lg:landscape:my-1">
        <header className="flex items-center justify-between gap-3 select-none max-lg:landscape:min-h-11">
          <Image
            src="/images/assets/patents/recruit.webp"
            alt="Recruta"
            width={90}
            height={90}
            className="max-lg:landscape:hidden"
          />

          <div className="flex items-center gap-3 lg:gap-10 lg:-translate-y-8 max-lg:landscape:scale-75 max-lg:landscape:origin-center">
            <HudValue
              icon="/images/assets/ui/xp.webp"
              alt="Experiência"
              value={wallet.xp}
            />
            <HudValue
              icon="/images/assets/ui/lattecoin.webp"
              alt="Lattecoins"
              value={wallet.lattecoins}
            />
          </div>

          <AnimatedUnderlineLink
            href="/dashboard"
            className="order-first font-heading text-tertiary hover:scale-103 lg:order-last lg:-translate-y-8"
            underlineClassName="[--underline-color:var(--color-tertiary)]"
          >
            <span className="text-xl lg:text-2xl">←</span>
            <span className="pl-1 text-sm sm:text-base lg:pl-2 lg:text-xl [-webkit-text-stroke:0.1px_black]">
              Sair da missão
            </span>
          </AnimatedUnderlineLink>
        </header>

        <section className="mt-4 text-start select-none lg:mt-8 max-lg:landscape:mt-0">
          <h1 className="text-2xl font-game text-tertiary sm:text-3xl lg:text-4xl max-lg:landscape:text-lg [-webkit-text-stroke:1.5px_black]">
            {mission.title}
          </h1>
          <p className="mt-1 text-base font-body text-text-primary lg:mt-2 lg:text-xl max-lg:landscape:hidden">
            {mission.description}
          </p>
        </section>

        {mission.requiresLandscape && (
          <div
            className="fixed inset-0 z-100 hidden flex-col items-center justify-center gap-5 bg-[#090617] px-8 text-center text-white max-lg:portrait:flex"
            role="status"
            aria-live="polite"
          >
            <span aria-hidden="true" className="text-6xl">↻</span>
            <h2 className="font-game text-2xl text-tertiary">Gire seu dispositivo</h2>
            <p className="max-w-sm font-body text-base">
              Esta missão foi projetada para jogar com o celular na horizontal.
            </p>
            <AnimatedUnderlineLink
              href="/dashboard"
              className="font-heading text-tertiary"
              underlineClassName="[--underline-color:var(--color-tertiary)]"
            >
              ← Voltar ao Dashboard
            </AnimatedUnderlineLink>
            <p className="max-w-sm font-body text-base">
              OBS: Se a tela não girar automaticamente, tente desativar o bloqueio de rotação do seu dispositivo.
            </p>
          </div>
        )}

        <MissionRenderer game={mission.game} section="game" />
      </div>
    </main>
  );
}
