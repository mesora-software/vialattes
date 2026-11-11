import BuildingSmoke from "./BuildingSmoke";

type BuildingFireProps = {
  width?: number;
  duration?: number;
  delay?: number;
};

const FLAMES = [
  { left: 15, width: 10, height: 14, delay: 0 },
  { left: 35, width: 14, height: 22, delay: 0.4 },
  { left: 55, width: 12, height: 18, delay: 0.8 },
  { left: 75, width: 10, height: 10, delay: 1.2 },
];

export default function BuildingFire({
  width = 60,
  duration = 2.5,
  delay = 0,
}: BuildingFireProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative"
      style={{
        width,
        height: 90,
        transform: "translate(-50%, -100%)",
      }}
    >

      {/* Fumaça de combustão */}
      <div
         className="absolute"
         style={{
            left: "50%",
            bottom: -80,
         }}
      >
         <BuildingSmoke
            width={55}
            duration={4.5}
            delay={delay}
            variant="fire"
         />
      </div>

      {/* Brilho difuso na base */}
      <div
        className="building-fire-glow absolute"
        style={{
          left: "50%",
          bottom: 0,
          width: "130%",
          height: 35,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(255,120,20,0.55) 0%, rgba(255,70,0,0.25) 45%, transparent 75%)",
          filter: "blur(12px)",
        }}
      />

      {/* Chamas animadas */}
      {FLAMES.map((flame, index) => (
        <span
          key={index}
          className="building-fire-flame absolute"
          style={{
            left: `${flame.left}%`,
            bottom: 0,
            width: flame.width,
            height: flame.height,
            background:
              "linear-gradient(to top, rgba(255,65,0,0.95) 0%, rgba(255,130,10,0.9) 40%, rgba(255,210,65,0.65) 75%, transparent 100%)",
            borderRadius: "60% 40% 55% 45% / 75% 70% 30% 25%",
            filter: "blur(2px)",
            transformOrigin: "bottom center",
            animationDuration: `${duration}s`,
            animationDelay: `-${flame.delay + delay}s`,
          }}
        />
      ))}

      {/* Núcleo luminoso */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: 0,
          width: "65%",
          height: 14,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(255,210,70,0.8) 0%, rgba(255,110,10,0.45) 50%, transparent 80%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
