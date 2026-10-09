
const positions = Array.from(
  { length: 21 },
  (_, index) => index - 10
);

export default function PositionAxis() {
  return (
    <div className="relative w-full">
      {/* Linha do eixo X */}
      <div className="relative h-[3px] bg-[#fdd501]">
        {/* Seta na extremidade direita */}
        <div
          className="absolute -right-1 -top-[6px]
                     h-0 w-0
                     border-y-[8px] border-y-transparent
                     border-l-[14px] border-l-[#fdd501]"
        />
      </div>

      {/* Coordenadas */}
      <div className="mt-3 grid grid-cols-21">
        {positions.map((position) => (
          <span
            key={position}
            className="text-center text-sm text-[#faf8f1]"
          >
            {position}
          </span>
        ))}
      </div>
    </div>
  );
}

