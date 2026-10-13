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
  // Rota disponível para o módulo Cinemática
  const missionHref =
    moduleId === "module01-cinematica"
      ? "/missions/module01-cinematica/mission01-posicao"
      : null;

  // Conteúdo visual do módulo
  const cardContent = (
    <>
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
        className="object-contain"
      />

      {/* Nome do módulo */}
      <span
        className="-mt-2 text-center text-xl font-extrabold text-[#fdd501]"
        style={{ fontFamily: '"Comic Octo", cursive' }}
      >
        {name}
      </span>
    </>
  );

  // Módulos com missão disponível
  if (missionHref) {
    return (
      <Link
        href={missionHref}
        className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
      >
        {cardContent}
      </Link>
    );
  }

  // Módulos ainda não implementados
  return (
    <div className="flex flex-col items-center">
      {cardContent}
    </div>
  );
}
