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
  // Verificar se o módulo está disponível
  const isAvailable = moduleId === "module01-cinematica";

  // Rota da missão disponível
  const missionHref =
    "/missions/module01-cinematica/mission01-posicao";

  // Conteúdo visual do módulo
  const cardContent = (
    <div className="relative flex flex-col items-center">

      {/* Conteúdo com opacidade reduzida quando bloqueado */}
      <div
        className={`flex flex-col items-center ${
          isAvailable ? "" : "opacity-40"
        }`}
      >
        {/* Estrelas */}
        <div className="mb-2 flex h-11.25 items-center justify-center gap-1">
          {Array.from({ length: stars }).map((_, index) => {
            const center = (stars - 1) / 2;
            const distance = Math.abs(index - center);
            const offsetY = distance * distance * 8;

            return (
              <Image
                key={index}
                src="/images/assets/ui/star-empty.svg"
                alt="Estrela vazia"
                width={20}
                height={20}
                loading="eager"
                style={{
                  transform: `translateY(${offsetY}px)`,
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
          className="object-contain"
        />

        {/* Nome do módulo */}
        <span
          className="-mt-2 text-center text-xl font-extrabold text-[#fdd501]"
          style={{ fontFamily: '"Comic Octo", cursive' }}
        >
          {name}
        </span>
      </div>

      {/* Cadeado dos módulos indisponíveis */}
      {!isAvailable && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/assets/ui/lock.svg"
            alt="Módulo bloqueado"
            width={55}
            height={55}
            loading="eager"
            className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}
    </div>
  );

  // Módulo disponível: permite navegação
  if (isAvailable) {
    return (
      <Link
        href={missionHref}
        className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
      >
        {cardContent}
      </Link>
    );
  }

  // Módulos bloqueados: sem navegação
  return (
    <div
      className="flex flex-col items-center cursor-not-allowed"
      aria-label={`${name} - módulo indisponível`}
    >
      {cardContent}
    </div>
  );
}

