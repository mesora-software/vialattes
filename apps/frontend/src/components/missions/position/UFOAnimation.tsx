import Image from "next/image";

export default function UFOAnimation() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{ aspectRatio: "768 / 410" }}
    >
      <Image
        src="/images/missions/position/ufo.png"
        alt=""
        fill
        sizes="(max-width: 1024px) 30vw, 220px"
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}
