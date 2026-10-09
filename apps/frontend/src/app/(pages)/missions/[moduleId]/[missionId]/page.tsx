import Image from "next/image";
import Link from "next/link";
import HudValue from "@/components/dashboard/HudValue";
import PositionGame from "@/components/missions/position/PositionGame";

export default function MissionPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage:
            "url('/images/missions/position/background.png')",
        }}
      />

      <div className="relative z-10 mx-[80px] my-[32px] flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Image
            src="/images/assets/patents/recruit.svg"
            alt="Recruta"
            width={120}
            height={120}
          />

          <div className="flex items-center gap-8">
            <HudValue
              icon="/images/assets/ui/xp.svg"
              alt="Experiência"
              value={0}
            />

            <HudValue
              icon="/images/assets/ui/lattecoin.svg"
              alt="Lattecoins"
              value={0}
            />
          </div>

          <Link
            href="/dashboard"
            className="text-xl text-[#fdd501] hover:underline"
          >
            ← Sair da missão
          </Link>
        </header>

        {/* Identificação da missão */}
        <section className="mt-8 text-center">
          <h1
            className="text-3xl text-[#fdd501]"
            style={{ fontFamily: '"Posey", cursive' }}
          >
            Cinemática • Posição
          </h1>

          <p
            className="mt-3 text-lg text-[#faf8f1]"
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
