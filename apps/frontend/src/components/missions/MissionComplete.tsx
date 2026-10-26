"use client";

import Image from "next/image";
import Link from "next/link";

interface MissionCompleteProps {
  defeatedEnemies: number;
  xp: number;
  lattecoins: number;
  nextMissionHref?: string;
}

interface RewardDisplayProps {
  title: string;
  icon: string;
  value: number;
  className: string;
  iconClassName?: string;
}

interface NavigationButtonProps {
  href?: string;
  image: string;
  label: string;
  className?: string;
}

const ASSETS = "/images/assets/ui/mission-complete";

function RewardDisplay({
  title,
  icon,
  value,
  className,
  iconClassName = "",
}: RewardDisplayProps) {
  return (
    <div
      className={`absolute flex h-[12%] w-[34%] flex-col items-center justify-center gap-1 max-lg:landscape:gap-0 ${className}`}
    >
      <span className="text-xs text-text-primary sm:text-xl max-lg:landscape:text-[clamp(7px,1.4vh,12px)]">
        {title}
      </span>

      <div className="flex items-center justify-center gap-2 max-lg:landscape:gap-1">
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className={`size-6 shrink-0 object-contain sm:size-8 max-lg:landscape:size-[clamp(12px,3vh,20px)] ${iconClassName}`}
        />

        <span className="text-lg whitespace-nowrap text-tertiary sm:text-3xl max-lg:landscape:text-[clamp(10px,2.5vh,18px)]">
          +{value.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

function NavigationButton({
  href,
  image,
  label,
  className = "",
}: NavigationButtonProps) {
  const imageElement = (
    <Image
      src={`${ASSETS}/${image}`}
      alt=""
      width={1085}
      height={365}
      className="h-auto w-full"
    />
  );

  const baseClassName = `block w-[37%] shrink-0 max-lg:landscape:w-[34%] ${className}`;

  if (!href || href === "#") {
    return (
      <div
        role="img"
        aria-label={`${label} — indisponível`}
        className={`${baseClassName} cursor-not-allowed opacity-70`}
      >
        {imageElement}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${baseClassName} transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-tertiary`}
    >
      {imageElement}
    </Link>
  );
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
      className="fixed inset-0 z-100 overflow-y-auto bg-black"
    >
      {/* Cenário do laboratório */}
      <Image
        src="/images/assets/backgrounds/laboratory.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Escurecimento do cenário */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Conteúdo principal */}
      <div
        className="
          relative z-10
          flex min-h-full items-start justify-center
          px-4 py-8

          max-lg:landscape:min-h-dvh
          max-lg:landscape:items-center
          max-lg:landscape:px-3
          max-lg:landscape:py-2
        "
      >
        <div
          className="
            flex w-full max-w-300
            flex-col items-center justify-center gap-2

            md:flex-row md:gap-4

            max-lg:landscape:flex-row
            max-lg:landscape:gap-2
          "
        >
          {/* Prof. Leonardo Lattes */}
          <div
            className="
              relative w-40 shrink-0

              sm:w-56

              md:w-[40%]
              md:translate-y-20

              max-lg:landscape:w-auto
              max-lg:landscape:max-w-[38%]
              max-lg:landscape:translate-y-4
            "
          >
            <Image
              src="/images/assets/characters/prof-lattes/leonard-mission-complete.png"
              alt="Prof. Leonardo Lattes comemorando a vitória"
              width={1060}
              height={1060}
              className="
                h-auto w-full object-contain drop-shadow-2xl

                max-lg:landscape:h-[min(78dvh,340px)]
                max-lg:landscape:w-auto
              "
              priority
            />
          </div>

          {/* Painel e botões */}
          <div
            className="
              flex w-full max-w-150
              flex-col items-center

              max-lg:landscape:w-[min(55vw,52dvh)]
              max-lg:landscape:max-w-none
              max-lg:landscape:shrink-0
            "
          >
            {/* Painel base */}
            <div className="relative w-full">
              <Image
                src={`${ASSETS}/panel-base.svg`}
                alt=""
                width={810}
                height={795}
                className="h-auto w-full"
                priority
              />

              {/* Informações da missão */}
              <div className="absolute inset-0 font-game">
                <h2
                  id="mission-complete-title"
                  className="sr-only"
                >
                  Missão concluída!
                </h2>

                {/* Inimigos derrotados */}
                <div
                  className="
                    absolute top-[38%] left-[15%]
                    flex h-[11%] w-[70%]
                    flex-col items-center justify-center
                  "
                >
                  <p
                    className="
                      text-center text-2xl
                      text-text-primary
                      [-webkit-text-stroke:0.3px_black]

                      max-lg:landscape:text-[clamp(10px,2.6vh,18px)]
                    "
                  >
                    Zips derrotados
                  </p>

                  <span
                    className="
                      translate-y-4 text-lg text-tertiary
                      sm:text-2xl

                      max-lg:landscape:translate-y-1
                      max-lg:landscape:text-[clamp(10px,2.5vh,18px)]
                    "
                  >
                    {defeatedEnemies}
                  </span>
                </div>

                {/* Recompensas */}
                <RewardDisplay
                  title="Experiência"
                  icon="/images/assets/ui/xp.svg"
                  value={xp}
                  className="top-[61%] left-[18%]"
                  iconClassName="-translate-x-2 sm:size-10 max-lg:landscape:translate-x-0"
                />

                <RewardDisplay
                  title="Lattecoins"
                  icon="/images/assets/ui/lattecoin.svg"
                  value={lattecoins}
                  className="top-[61%] left-[48%]"
                />
              </div>
            </div>

            {/* Navegação */}
            <div
              className="
                relative z-20
                mt-[-22%]
                flex w-full items-center justify-center gap-2

                max-lg:landscape:gap-1
              "
            >
              <NavigationButton
                href="/dashboard"
                image="btn-back-dashboard.svg"
                label="Voltar ao Dashboard"
              />

              <NavigationButton
                href={nextMissionHref}
                image="btn-next-mission.svg"
                label="Ir para a próxima missão"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
