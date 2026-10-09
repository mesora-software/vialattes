import Image from "next/image";

interface AimPanelProps {
  position: number;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onFire: () => void;
}

export default function AimPanel({
  position,
  onMoveLeft,
  onMoveRight,
  onFire,
}: AimPanelProps) {
  const assets = "/images/missions/position";

  return (
    <div className="relative w-87.5 select-none">
      {/* Estrutura do painel */}
      <Image
        src={`${assets}/aim-panel-base.svg`}
        alt="Sistema de mira"
        width={550}
        height={750}
        className="h-auto w-full"
        priority
      />

      {/* Radar */}
      <div className="pointer-events-none absolute left-[33%] top-[18%] w-[33%]">
        <Image
          src={`${assets}/radar.svg`}
          alt="Radar"
          width={260}
          height={260}
          className="h-auto w-full"
        />
      </div>

      {/* Visor da coordenada */}
      <div className="absolute left-[23%] top-[62%] flex h-[10%] w-[28%] items-center justify-center">
        <span className="text-3xl font-bold text-[#aaff00]">
          {position}
        </span>
      </div>

      {/* Botão esquerda */}
      <button
        type="button"
        onClick={onMoveLeft}
        disabled={position <= -10}
        aria-label="Mover drone para esquerda"
        className="absolute z-20 left-[51%] top-[61%] w-[12%] cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image
          src={`${assets}/btn-left.svg`}
          alt=""
          width={80}
          height={80}
          className="h-auto w-full"
        />
      </button>

      {/* Botão direita */}
      <button
        type="button"
        onClick={onMoveRight}
        disabled={position >= 10}
        aria-label="Mover drone para direita"
        className="absolute z-20 left-[65%] top-[61%] w-[12%] cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image
          src={`${assets}/btn-right.svg`}
          alt=""
          width={80}
          height={80}
          className="h-auto w-full"
        />
      </button>

      {/* Botão disparar */}
      <button
        type="button"
        onClick={onFire}
        aria-label="Disparar bomba"
        className="absolute z-10 left-[20%] top-[60%] w-[59%] cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
      >
        <Image
          src={`${assets}/btn-fire.svg`}
          alt=""
          width={400}
          height={110}
          className="h-auto w-full"
        />
      </button>
    </div>
  );
}
