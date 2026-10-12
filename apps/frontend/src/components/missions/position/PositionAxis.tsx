const positions = Array.from(
  { length: 21 },
  (_, index) => index - 10
);

export default function PositionAxis() {
  return (
    <div className="relative w-full">
      <div className="relative h-0.75 bg-[#fdd501]">
        <div
          className="absolute -right-1 -top-1.5
                     h-0 w-0
                     border-y-8 border-y-transparent
                     border-l-14 border-l-[#fdd501]"
        />
      </div>

      <div className="relative mt-3 h-6">
        {positions.map((position) => (
          <span
            key={position}
            className="absolute -translate-x-1/2 text-sm font-bold text-[#fdd501]"
            style={{
              left: `${((position + 10) / 20) * 100}%`,
            }}
          >
            {position}
          </span>
        ))}
      </div>
    </div>
  );
}


