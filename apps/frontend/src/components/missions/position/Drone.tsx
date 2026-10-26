import Image from "next/image";

interface DroneProps {
  position: number;
}

export default function Drone({ position }: DroneProps) {
  const percentage = ((position + 10) / 20) * 100;

  return (
    <div
      className="absolute top-0 z-50 -translate-x-1/2 h-22.5 w-22.5 max-lg:landscape:h-12 max-lg:landscape:w-12"
      style={{
        left: `${percentage}%`,
      }}
    >
      <Image
        src="/images/missions/position/drone.svg"
        alt="Drone"
        width={90}
        height={90}
        className="block h-full w-full object-contain"
        priority
      />
    </div>
  );
}
