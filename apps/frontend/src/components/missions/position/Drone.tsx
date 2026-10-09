import Image from "next/image";

interface DroneProps {
  position: number;
}

export default function Drone({ position }: DroneProps) {
  const percentage = ((position + 10) / 20) * 100; // Converte a posição do drone em uma porcentagem horizontal

  return (
    <div
      className="absolute top-0 -translate-x-1/2"
      style={{ left: `${percentage}%` }}
    >
      <Image
        src="/images/missions/position/drone.svg"
        alt="Drone"
        width={90}
        height={90}
        priority
      />
    </div>
  );
}
