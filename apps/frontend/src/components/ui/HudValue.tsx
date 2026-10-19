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
    <div className="flex items-center justify-center p-3 select-none">
      <div className="relative flex w-max items-center">
        {/* Ícone */}
        <Image
          src={icon}
          alt={alt}
          width={30}
          height={30}
          className="relative z-20 shrink-0 object-contain"
        />

        {/* Visor */}
        <GamePanel
          className="-ml-6 shrink-0"
          contentClassName="h-6 min-w-17 pl-7 pr-4"
        >
          {value}
        </GamePanel>
      </div>
    </div>
  );
}


