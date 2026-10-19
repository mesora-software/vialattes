import Image from "next/image";
import Link from "next/link";
import GamePanel from "@/components/ui/GamePanel";

interface DashboardActionProps {
  name: string;
  image: string;
  href: string;
  width?: number;
  height?: number;
}

/**
 * DashboardAction
 *
 * Renders an interactive action button for dashboard features.
 * Reuses GamePanel for consistent panel styling.
 *
 * Handles dashboard-specific icons, navigation, labels,
 * and hover interactions.
 */

export default function DashboardAction({
  name,
  image,
  href,
  width = 80,
  height = 80,
}: DashboardActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center select-none transition-transform duration-200 hover:scale-105"
    >
      {/* Ícone */}
      <Image
        src={image}
        alt={name}
        width={width}
        height={height}
        loading="eager"
        className="relative z-20 object-contain"
      />

      {/* Visor */}
      <GamePanel
        className="-ml-6"
        contentClassName="h-9 min-w-20 px-6"
      >
        <span className="font-heading text-xl">
          {name}
        </span>
      </GamePanel>
    </Link>
  );
}