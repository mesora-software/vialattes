import Image from "next/image";

interface HudValueProps {
  icon: string;
  value: number;
  alt: string;
}

export default function HudValue({
  icon,
  value,
  alt,
}: HudValueProps) {
  return (
    <div className="flex items-center">
      {/* Ícone */}
      <Image
        src={icon}
        alt={alt}
        width={30}
        height={30}
        className="relative z-20 object-contain"
      />

      {/* Moldura do visor */}
      <div
        className="
          -ml-6
          rounded-r-lg
          rounded-l-xl
          p-0.5
        "
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #f8f8f8, #7458a9)",
        }}
      >
        {/* Interior do visor */}
        <div
          className="
            flex
            h-6
            min-w-20
            items-center
            justify-center
            rounded-r-lg
            rounded-l-lg

            bg-[#402e6a]/90
            px-6
          "
        >
          <span
            className="text-xl font-bold text-[#fdd501]"
            style={{
              fontFamily: '"Comic Octo", cursive',
            }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

