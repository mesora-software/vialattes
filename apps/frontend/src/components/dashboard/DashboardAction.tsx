import Image from "next/image";
import Link from "next/link";

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
 * Handles action-specific presentation and user interactions.
 *
 * Unlike GamePanel, which provides reusable visual styling,
 * this component is designed for dashboard-specific actions.
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
      className="flex items-center transition-transform duration-200 hover:scale-105"
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

      {/* Moldura do visor */}
      <div
        className="
          -ml-6
          rounded-r-lg
          rounded-l-xl
          p-0.5
        "
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #f8f8f8, #7458a9)",
        }}
      >
        {/* Interior do visor */}
        <div
          className="
            flex
            h-9
            min-w-20
            items-center
            justify-center
            rounded-r-lg
            rounded-l-lg

            bg-primary/90
            px-6
          "
        >
          <span
            className="text-xl font-extrabold text-text-tertiary"
            style={{
              fontFamily: '"Comic Octo", cursive',
            }}
          >
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
