type BuildingSmokeProps = {
  width?: number;
  duration?: number;
  delay?: number;
};

const PARTICLES = [
  { left: 30, delay: 0, size: 34 },
  { left: 45, delay: 1.2, size: 42 },
  { left: 60, delay: 2.4, size: 38 },
  { left: 40, delay: 3.6, size: 46 },
];

export default function BuildingSmoke({
  width = 80,
  duration = 5,
  delay = 0,
}: BuildingSmokeProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative"
      style={{
        width,
        height: 160,
        transform: "translate(-50%, -100%)",
      }}
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="building-smoke-particle absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: 0,
            width: particle.size,
            height: particle.size,
            background:
              "radial-gradient(circle, rgba(115,115,125,0.7) 0%, rgba(85,85,95,0.4) 45%, transparent 75%)",
            filter: "blur(5px)",
            animationDuration: `${duration}s`,
            animationDelay: `-${particle.delay + delay}s`,
          }}
        />
      ))}
    </div>
  );
}
