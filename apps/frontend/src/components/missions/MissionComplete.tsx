import Image from "next/image";
import Link from "next/link";
import GamePanel from "@/components/ui/GamePanel";

interface MissionCompleteProps {
  defeatedEnemies: number;
  xp: number;
  lattecoins: number;
  nextMissionHref?: string;
}

export default function MissionComplete({
  defeatedEnemies,
  xp,
  lattecoins,
  nextMissionHref,
}: MissionCompleteProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-complete-title"
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        overflow-y-auto
        bg-surface-dark/95
        p-4 md:p-8
      "
    >
      <div
        className="
          relative flex w-full max-w-6xl
          flex-col items-center justify-center
          gap-4 lg:flex-row lg:gap-0
        "
      >
        {/* Personagem */}
        <div
          className="
            relative z-20
            flex w-full items-center justify-center
            lg:w-2/5
          "
        >
          <Image
            src="/images/assets/leonard/leonard-mission-complete.png"
            alt="Professor Leonardo Lattes comemorando a vitória"
            width={500}
            height={650}
            className="
              h-auto w-56 object-contain
              drop-shadow-2xl
              md:w-72 lg:w-full
            "
            priority
          />
        </div>

        {/* Painel de conclusão */}
        <GamePanel
          className="
            relative z-10
            w-full max-w-2xl
            shadow-2xl
            lg:-ml-8 lg:w-3/5
          "
          contentClassName="
            flex-col gap-6
            px-5 py-8
            text-center
            md:px-10 md:py-12
          "
        >
          {/* Medalha */}
          <div className="text-5xl" aria-hidden="true">
            ⭐
          </div>

          {/* Título */}
          <h2
            id="mission-complete-title"
            className="
              font-heading
              text-3xl font-bold
              text-tertiary
              md:text-5xl
            "
          >
            Missão concluída!
          </h2>

          {/* Progresso */}
          <p className="font-heading text-lg text-text-primary">
            Você derrotou{" "}
            <span className="font-game text-tertiary">
              {defeatedEnemies}
            </span>{" "}
            Zips!
          </p>

          {/* Recompensas */}
          <div className="flex w-full flex-col gap-5">
            <h3 className="font-heading text-xl text-tertiary">
              Recompensas obtidas
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* XP */}
              <div
                className="
                  flex items-center justify-center gap-3
                  rounded-xl border border-border-accent
                  bg-surface-dark/80
                  px-3 py-5
                "
              >
                <Image
                  src="/images/assets/ui/xp.svg"
                  alt=""
                  width={45}
                  height={45}
                />

                <span className="font-game text-2xl text-tertiary">
                  +{xp.toLocaleString("pt-BR")}
                </span>
              </div>

              {/* Lattecoins */}
              <div
                className="
                  flex items-center justify-center gap-3
                  rounded-xl border border-border-accent
                  bg-surface-dark/80
                  px-3 py-5
                "
              >
                <Image
                  src="/images/assets/ui/lattecoin.svg"
                  alt=""
                  width={45}
                  height={45}
                />

                <span className="font-game text-2xl text-tertiary">
                  +{lattecoins.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </div>

          {/* Navegação */}
          <div
            className="
              mt-4 flex w-full flex-col
              gap-3 sm:flex-row
            "
          >
            <Link
              href="/dashboard"
              className="
                flex min-h-14 flex-1
                items-center justify-center
                rounded-xl border-2 border-border-accent
                bg-purple-gradient
                px-4 py-3
                font-heading font-bold
                text-text-primary
                transition-transform duration-200
                hover:scale-105
              "
            >
              Voltar ao Dashboard
            </Link>

            {nextMissionHref && (
              <Link
                href={nextMissionHref}
                className="
                  flex min-h-14 flex-1
                  items-center justify-center
                  rounded-xl border-2 border-tertiary
                  bg-tertiary
                  px-4 py-3
                  font-heading font-bold
                  text-primary-dark
                  transition-transform duration-200
                  hover:scale-105
                "
              >
                Próxima missão →
              </Link>
            )}
          </div>
        </GamePanel>
      </div>
    </div>
  );
}