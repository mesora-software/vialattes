"use client";

import Image from "next/image";

type Drone = {
  id: number;
  src: string;
  width: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
};

const DRONES: Drone[] = [
  {
    id: 1,
    src: "/images/missions/position/drone01.webp",
    width: 38,
    left: 470,
    top: 210,
    duration: 18,
    delay: 0,
    opacity: 0.45,
  },
  {
    id: 2,
    src: "/images/missions/position/drone02.webp",
    width: 32,
    left: 720,
    top: 290,
    duration: 22,
    delay: -7,
    opacity: 0.4,
  },
  {
    id: 3,
    src: "/images/missions/position/drone03.webp",
    width: 28,
    left: 950,
    top: 190,
    duration: 20,
    delay: -12,
    opacity: 0.35,
  },
];

export default function BackgroundDrones() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {DRONES.map((drone) => (
        <div
          key={drone.id}
          className={`background-drone background-drone-${drone.id} absolute`}
          style={{
            left: drone.left,
            top: drone.top,
            width: drone.width,
            opacity: drone.opacity,
            animationDuration: `${drone.duration}s`,
            animationDelay: `${drone.delay}s`,
          }}
        >
          <Image
            src={drone.src}
            alt=""
            width={360}
            height={216}
            className="block h-auto w-full"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

