"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  animate,
} from "framer-motion";


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
  delay: number;
  iconClassName?: string;
  reduceMotion: boolean;
}

interface NavigationButtonProps {
  href?: string;
  image: string;
  label: string;
  className?: string;
}

interface AnimatedCounterProps {
  value: number;
  delay: number;
  reduceMotion: boolean;
  prefix?: string;
  className?: string;
}

const ASSETS = "/images/assets/ui/mission-complete";

const COUNT_DURATION = 0.75;


function AnimatedCounter({
  value,
  delay,
  reduceMotion,
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const count = useMotionValue(0);

  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
      setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const controls = animate(count, value, {
      duration: COUNT_DURATION,
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, value, delay, reduceMotion]);

  const currentValue = reduceMotion ? value : displayValue;

  return (
    <span className={className}>
      {prefix}
      {currentValue.toLocaleString("pt-BR")}
    </span>
  );
}


function RewardDisplay({
  title,
  icon,
  value,
  className,
  delay,
  iconClassName = "",
  reduceMotion,
}: RewardDisplayProps) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.9 }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
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

        <AnimatedCounter
          value={value}
          delay={delay}
          reduceMotion={reduceMotion}
          prefix="+"
          className="
            whitespace-nowrap text-tertiary
            text-[clamp(11px,4cqw,30px)]
            leading-none
          "
        />
      </div>
    </motion.div>
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
      width={543}
      height={183}
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
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;

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
        src="/images/assets/backgrounds/laboratory.webp"
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
          px-4 py-3
          sm:py-6

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
            justify-center gap-0

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
              relative w-32 shrink-0

              sm:w-44

              md:w-[30%]
              md:max-w-85
              md:translate-y-8

              max-lg:landscape:w-auto
              max-lg:landscape:max-w-[38%]
              max-lg:landscape:translate-y-0
            "
          >
            <Image
              src="/images/assets/characters/prof-lattes/prof-lattes-celebrating-animated.webp"
              alt="Prof. Lattes pulando e comemorando a vitória"
              width={356}
              height={540}
              unoptimized
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

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.85, y: 100 }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex w-full max-w-120
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
                src={`${ASSETS}/panel-base.webp`}
                alt=""
                width={540}
                height={540}
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
                =========================================== */}

                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.8,
                    ease: "easeOut",
                  }}
                  className="
                    absolute top-[37.5%] left-[15%]
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
                </motion.div>

                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.8,
                    ease: "easeOut",
                  }}
                  className="
                    absolute top-[45%] left-[15%]
                    flex h-[6%] w-[70%]
                    items-center justify-center

                    whitespace-nowrap
                    text-tertiary

                    text-[clamp(12px,4.5cqw,32px)]
                    leading-none
                  "
                >
                  <AnimatedCounter
                    value={defeatedEnemies}
                    delay={0.8}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>

                {/* ===========================================
                    RECOMPENSAS
                =========================================== */}

                <RewardDisplay
                  title="Experiência"
                  icon="/images/assets/ui/xp.webp"
                  value={xp}
                  delay={1.2}
                  reduceMotion={reduceMotion}
                  className="top-[57%] left-[18%]"
                />

                <RewardDisplay
                  title="Lattecoins"
                  icon="/images/assets/ui/lattecoin.webp"
                  value={lattecoins}
                  delay={1.6}
                  reduceMotion={reduceMotion}
                  className="top-[57%] left-[48%]"
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
                image="btn-back-dashboard.webp"
                label="Voltar ao Dashboard"
              />

              <NavigationButton
                href={nextMissionHref}
                image="btn-next-mission.webp"
                label="Ir para a próxima missão"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
