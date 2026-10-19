import Image from "next/image";
import GamePanel from "@/components/ui/GamePanel";

interface HudValueProps {
  icon: string;
  value: number;
  alt: string;
}

export default function HudValue({
  icon,
  value,
  alt,
}: HudValueProps) {
  return (
    <div className="flex items-center select-none">
      {/* Ícone */}
      <Image
        src={icon}
        alt={alt}
        width={30}
        height={30}
        className="relative z-20 object-contain"
      />

      {/* Visor */}
      <GamePanel
        className="-ml-6"
        contentClassName="h-6 min-w-10 px-8 text-xl"
      >
        {value}
      </GamePanel>
    </div>
  );
}


