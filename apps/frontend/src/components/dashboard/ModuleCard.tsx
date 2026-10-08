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
  return (
    <Link
      href={`/modules/${moduleId}`}
      className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
    >
      <div className="mb-2 flex h-11.25 items-center justify-center gap-1">
        {Array.from({ length: stars }).map((_, index) => {
          const center = (stars - 1) / 2;
          const distance = Math.abs(index - center);
          const offsetY = distance * distance * 8;

          return (
            <Image
              key={index}
              src="/images/assets/ui/star-empty.svg"
              alt="estrela vazia"
              width={20}
              height={20}
              style={{ 
                transform: `translateY(${offsetY}px)`
              }}
          />
        );
      })}
      </div>

      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="object-contain"
      />

      <span
        className="-mt-2 text-center text-xl font-extrabold text-[#fdd501]"
        style={{ fontFamily: '"Comic Octo", cursive' }}
      >
        {name}
      </span>
    </Link>
  );
}
