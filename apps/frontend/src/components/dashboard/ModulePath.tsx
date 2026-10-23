import type { PathPoint } from "@/hooks/useModulePath";

interface ModulePathProps {
  variant: "mobile" | "desktop";
  points?: PathPoint[];
  startPoint?: PathPoint | null;
  endPoint?: PathPoint | null;
  width?: number;
  height?: number;
}

// Gera uma curva suave conectando os pontos
function createSmoothPath(points: PathPoint[]): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];

    const distanceY = current.y - previous.y;

    // Controla a suavidade da curva
    const controlOffset = distanceY * 0.4;

    const controlPoint1 = {
      x: previous.x,
      y: previous.y + controlOffset,
    };

    const controlPoint2 = {
      x: current.x,
      y: current.y - controlOffset,
    };

    path += `
      C ${controlPoint1.x} ${controlPoint1.y},
        ${controlPoint2.x} ${controlPoint2.y},
        ${current.x} ${current.y}
    `;
  }

  return path;
}

export default function ModulePath({
  variant,
  points = [],
  startPoint = null,
  endPoint = null,
  width = 0,
  height = 0,
}: ModulePathProps) {

  // ==========================================
  // MOBILE E TABLET
  // ==========================================

  if (variant === "mobile") {
    if (
      points.length < 2 ||
      !startPoint ||
      !endPoint ||
      width <= 0 ||
      height <= 0
    ) {
      return null;
    }

    // Conecta Header, módulos e Footer
    const allPoints: PathPoint[] = [
      startPoint,
      ...points,
      endPoint,
    ];

    // Gera o caminho SVG
    const pathData = createSmoothPath(allPoints);

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          lg:hidden
        "
        aria-hidden="true"
      >
        <path
          d={pathData}
          fill="none"
          stroke="#ff66c4"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          strokeOpacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  // ==========================================
  // DESKTOP
  // ==========================================

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute top-0 -left-30
        hidden h-full
        w-[calc(100%+225px)]
        lg:block
      "
      aria-hidden="true"
    >
      <path
        d="
          M 0 150
          C 70 150, 90 50, 140 50
          S 250 250, 300 250
          S 450 50, 500 50
          S 650 250, 700 250
          S 850 50, 900 50
          S 1010 250, 1060 250
          S 1150 150, 1200 150
        "
        fill="none"
        stroke="#ff66c4"
        strokeWidth="4"
        strokeDasharray="10 10"
        strokeLinecap="round"
        strokeOpacity="0.5"
        transform="translate(0, 10)"
      />
    </svg>
  );
}
