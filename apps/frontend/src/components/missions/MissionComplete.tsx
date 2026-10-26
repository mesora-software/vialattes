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
      className={`
        absolute h-[18%] w-[34%]
        ${className}
      `}
    >
      {/* Título da recompensa */}
      <span
        className="
          absolute top-[5%] left-0
          flex h-[35%] w-full
          items-center justify-center

          whitespace-nowrap
          text-text-primary

          text-[clamp(8px,2.6cqw,20px)]
          leading-none
        "
      >
        {title}
      </span>

      {/* Valor da recompensa */}
      <div
        className="
          absolute top-[45%] left-0
          flex h-[40%] w-full
          items-center justify-center
          gap-[1cqw]
        "
      >
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className={`
            h-[clamp(12px,5cqw,40px)]
            w-[clamp(12px,5cqw,40px)]
            shrink-0 object-contain
            ${iconClassName}
          `}
        />

        <span
          className="
            whitespace-nowrap text-tertiary
            text-[clamp(11px,4cqw,30px)]
            leading-none
          "
        >
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

  const baseClassName = `
    block w-[37%] shrink-0
    max-lg:landscape:w-[34%]
    ${className}
  `;

  if (!href || href === "#") {
    return (
      <div
        role="img"
        aria-label={`${label} — indisponível`}
        className={`
          ${baseClassName}
          cursor-not-allowed opacity-70
        `}
      >
        {imageElement}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`
        ${baseClassName}
        transition-transform duration-200
        hover:scale-105
        focus-visible:scale-105
        focus-visible:outline-2
        focus-visible:outline-tertiary
      `}
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
      className="
        fixed inset-0 z-100
        overflow-y-auto bg-black
      "
    >
      {/* =====================================================
          CENÁRIO
      ===================================================== */}

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

      {/* =====================================================
          CONTEÚDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          relative z-10
          flex min-h-full
          items-start justify-center
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
            flex-col items-center
            justify-center gap-2

            md:flex-row
            md:gap-4

            max-lg:landscape:flex-row
            max-lg:landscape:gap-2
          "
        >
          {/* =================================================
              PROFESSOR LEONARDO LATTES
          ================================================= */}

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
                h-auto w-full
                object-contain drop-shadow-2xl

                max-lg:landscape:h-[min(78dvh,480px)]
                max-lg:landscape:w-auto
              "
              priority
            />
          </div>

          {/* =================================================
              PAINEL E BOTÕES
          ================================================= */}

          <div
            className="
              flex w-full max-w-150
              flex-col items-center

              max-lg:landscape:w-[min(55vw,92dvh)]
              max-lg:landscape:max-w-none
              max-lg:landscape:shrink-0
            "
          >
            {/* Painel base */}
            <div
              className="
                relative w-full
                @container
              "
            >
              <Image
                src={`${ASSETS}/panel-base.svg`}
                alt=""
                width={810}
                height={795}
                className="h-auto w-full"
                priority
              />

              {/* =============================================
                  INFORMAÇÕES DA MISSÃO
              ============================================= */}

              <div className="absolute inset-0 font-game">
                <h2
                  id="mission-complete-title"
                  className="sr-only"
                >
                  Missão concluída!
                </h2>

                {/* ===========================================
                    ZIPS DERROTADOS
                    Título e valor independentes
                =========================================== */}

                {/* Título */}
                <p
                  className="
                    absolute top-[39%] left-[15%]
                    flex h-[5%] w-[70%]
                    items-center justify-center

                    whitespace-nowrap
                    text-center text-text-primary

                    text-[clamp(10px,4cqw,26px)]
                    leading-none

                    [-webkit-text-stroke:0.3px_black]
                  "
                >
                  Zips derrotados
                </p>

                {/* Número */}
                <span
                  className="
                    absolute top-[46%] left-[15%]
                    flex h-[6%] w-[70%]
                    items-center justify-center

                    whitespace-nowrap
                    text-tertiary

                    text-[clamp(12px,4.5cqw,32px)]
                    leading-none
                  "
                >
                  {defeatedEnemies}
                </span>

                {/* ===========================================
                    RECOMPENSAS
                =========================================== */}

                <RewardDisplay
                  title="Experiência"
                  icon="/images/assets/ui/xp.svg"
                  value={xp}
                  className="top-[58%] left-[18%]"
                />

                <RewardDisplay
                  title="Lattecoins"
                  icon="/images/assets/ui/lattecoin.svg"
                  value={lattecoins}
                  className="top-[58%] left-[48%]"
                />
              </div>
            </div>

            {/* ===============================================
                NAVEGAÇÃO
            =============================================== */}

            <div
              className="
                relative z-20
                mt-[-22%]
                flex w-full
                items-center justify-center
                gap-2

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
