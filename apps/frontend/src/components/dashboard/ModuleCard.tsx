import Image from "next/image";
import Link from "next/link";

interface ModuleCardProps {
  name: string;
  image: string;
  moduleId: string;
  stars?: number;
}

export default function ModuleCard({
  name,
  image,
  moduleId,
  stars = 4,
}: ModuleCardProps) {
  const isAvailable = moduleId === "module01-cinematica";

  const missionHref =
    "/missions/module01-cinematica/mission01-posicao";

  const cardContent = (
    <div className="relative flex min-w-0 flex-col items-center">

      <div
        className={`
          flex min-w-0 flex-col items-center
          ${isAvailable ? "" : "opacity-40"}
        `}
      >

        {/* Estrelas */}
        <div
          className="
            mb-2
            flex h-9 items-center justify-center gap-1
            select-none
            [--star-arc:5px]
            sm:h-10 sm:[--star-arc:6.5px]
            lg:h-11.25 lg:[--star-arc:8px]
          "
        >
          {Array.from({ length: stars }).map((_, index) => {
            const center = (stars - 1) / 2;
            const distance = Math.abs(index - center);

            const offsetFactor = distance * distance;

            return (
              <Image
                key={index}
                src="/images/assets/ui/star-empty.svg"
                alt="Estrela vazia"
                width={20}
                height={20}
                loading="eager"
                className="
                  h-3.5 w-3.5
                  sm:h-4.25 sm:w-4.25
                  lg:h-5 lg:w-5
                "
                style={{
                  transform: `translateY(calc(${offsetFactor} * var(--star-arc)))`,
                }}
              />
            );
          })}
        </div>

        {/* Ícone do módulo */}
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          loading="eager"
          className="
            h-17.5 w-17.5
            object-contain
            sm:h-21.25 sm:w-21.25
            lg:h-25 lg:w-25
          "
        />

        {/* Nome */}
        <span
          className="
            -mt-2
            max-w-32
            text-center
            font-game
            text-sm
            leading-tight
            text-tertiary
            wrap-break-word
            sm:max-w-40 sm:text-base
            lg:max-w-none lg:text-xl
          "
        >
          {name}
        </span>

      </div>

      {/* Cadeado */}
      {!isAvailable && (
        <div
          className="
            pointer-events-none
            absolute top-1/2 left-1/2 z-10
            -translate-x-1/2 -translate-y-1/2
          "
        >
          <Image
            src="/images/assets/ui/lock.svg"
            alt="Módulo bloqueado"
            width={55}
            height={55}
            loading="eager"
            className="
              h-9.5 w-9.5
              drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]
              sm:h-11.5 sm:w-11.5
              lg:h-13.75 lg:w-13.75
            "
          />
        </div>
      )}

    </div>
  );

  if (isAvailable) {
    return (
      <Link
        href={missionHref}
        className="
          flex min-w-0 flex-col items-center
          transition-transform duration-200
          hover:scale-105
          select-none
        "
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      className="
        flex min-w-0 flex-col items-center
        cursor-not-allowed select-none
      "
      aria-label={`${name} - módulo indisponível`}
    >
      {cardContent}
    </div>
  );
}
