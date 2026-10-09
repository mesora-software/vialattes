interface AimPanelProps {
  position: number;
}

export default function AimPanel({
  position,
}: AimPanelProps) {
  return (
    <div className="w-[260px] rounded-2xl border-2 border-[#7458a9] bg-[#402e6a]/90 p-5">
      <h2 className="mb-4 text-center text-xl font-bold text-[#fdd501]">
        PAINEL DE MIRA
      </h2>

      <div className="mb-5 rounded-lg bg-black/40 p-4 text-center">
        <p className="text-sm text-[#faf8f1]">
          Posição do drone
        </p>

        <p className="mt-2 text-3xl font-bold text-[#fdd501]">
          {position > 0 ? `+${position}` : position}
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          className="rounded-lg bg-[#7458a9] px-5 py-3 text-white"
        >
          ←
        </button>

        <button
          type="button"
          className="rounded-lg bg-[#7458a9] px-5 py-3 text-white"
        >
          →
        </button>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-[#fdd501] py-3 font-bold text-black"
      >
        DISPARAR
      </button>
    </div>
  );
}
