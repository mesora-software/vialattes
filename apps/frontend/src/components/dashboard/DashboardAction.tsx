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
      className="
        flex min-w-0
        items-center justify-center
        select-none
        transition-transform duration-200
        hover:scale-105
      "
    >
      {/* Ícone */}
      <Image
        src={image}
        alt={name}
        width={width}
        height={height}
        loading="eager"
        className="
          relative z-10
          h-13.75 w-13.75
          shrink-0 object-contain
          sm:h-17.5 sm:w-17.5
          lg:h-22.5 lg:w-22.5
        "
      />

      {/* Visor */}
      <GamePanel
        className="
          -ml-4
          sm:-ml-5
          lg:-ml-6
        "
        contentClassName="
          flex h-7 min-w-16
          items-center justify-center
          px-3
          sm:h-8 sm:min-w-18 sm:px-4
          lg:h-9 lg:min-w-20 lg:px-6
        "
      >
        <span
          className="
            font-heading
            text-xs whitespace-nowrap
            sm:text-sm
            lg:text-xl
          "
        >
          {name}
        </span>
      </GamePanel>
    </Link>
  );
}
