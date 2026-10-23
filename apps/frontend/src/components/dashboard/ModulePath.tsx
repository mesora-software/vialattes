import type { PathPoint } from "@/hooks/useModulePath";

interface ModulePathProps {
  variant: "mobile" | "desktop";
  points?: PathPoint[];
  width?: number;
  height?: number;
}

export default function ModulePath({
  variant,
  points = [],
  width = 0,
  height = 0,
}: ModulePathProps) {
  if (variant === "mobile") {
    if (points.length < 2 || width <= 0 || height <= 0) {
      return null;
    }

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    const startPoint = {
      x: width / 2,
      y: 0,
    };

    const endPoint = {
      x: width / 2,
      y: height,
    };

    const allPoints = [startPoint, ...points, endPoint];

    const pathData = allPoints.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = allPoints[index - 1];

      const controlY = (previous.y + point.y) / 2;

      return `
        ${path}
        C ${previous.x} ${controlY},
          ${point.x} ${controlY},
          ${point.x} ${point.y}
      `;
    }, "");

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
