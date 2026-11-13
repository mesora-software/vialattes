type BuildingSmokeProps = {
  width?: number;
  duration?: number;
  delay?: number;
  variant?: "ambient" | "fire";
};

const AMBIENT_PARTICLES = [
  { left: 30, delay: 0, size: 34 },
  { left: 45, delay: 1.2, size: 42 },
  { left: 60, delay: 2.4, size: 38 },
  { left: 40, delay: 3.6, size: 46 },
];

const FIRE_PARTICLES = [
  { left: 35, delay: 0, size: 24 },
  { left: 50, delay: 0.8, size: 30 },
  { left: 45, delay: 1.6, size: 27 },
  { left: 55, delay: 2.4, size: 33 },
];

export default function BuildingSmoke({
  width = 80,
  duration = 5,
  delay = 0,
  variant = "ambient",
}: BuildingSmokeProps) {
  const isFire = variant === "fire";

  const particles = isFire
    ? FIRE_PARTICLES
    : AMBIENT_PARTICLES;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative"
      style={{
        width,
        height: isFire ? 75 : 160,
        transform: "translate(-50%, -100%)",
      }}
    >
      {particles.map((particle, index) => (
        <span
          key={index}
          className={`absolute rounded-full ${
            isFire
              ? "building-fire-smoke-particle"
              : "building-smoke-particle"
          }`}
          style={{
            left: `${particle.left}%`,
            bottom: 0,
            width: particle.size,
            height: particle.size,
            background: isFire
              ? "radial-gradient(circle, rgba(55,50,55,0.8) 0%, rgba(65,60,65,0.45) 45%, transparent 75%)"
              : "radial-gradient(circle, rgba(115,115,125,0.7) 0%, rgba(85,85,95,0.4) 45%, transparent 75%)",
            filter: isFire ? "blur(3px)" : "blur(5px)",
            animationDuration: `${duration}s`,
            animationDelay: `-${particle.delay + delay}s`,
          }}
        />
      ))}
    </div>
  );
}

