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
      <div className="mb-2 flex h-6 items-center justify-center gap-1">
        {Array.from({ length: stars }).map((_, index) => (
          <span
            key={index}
            className="text-xl text-[#fdd501]"
          >
            ★
          </span>
        ))}
      </div>

      <Image
        src={image}
        alt={name}
        width={130}
        height={130}
        className="object-contain"
      />

      <span
        className="mt-2 text-center text-xl text-[#fdd501]"
        style={{ fontFamily: '"Comic Octo", cursive' }}
      >
        {name}
      </span>
    </Link>
  );
}
