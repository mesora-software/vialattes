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
      <Image
        src={icon}
        alt={alt}
        width={50}
        height={50}
        className="relative z-10 object-contain"
      />

      <div
        className="
          -ml-3
          flex
          h-[42px]
          min-w-[110px]
          items-center
          justify-center
          rounded-r-full
          rounded-l-lg
          border-2
          border-transparent
          bg-[linear-gradient(#402e6a,#402e6a)_padding-box,radial-gradient(circle_at_50%_50%,#f8f8f8,#7458a9)_border-box]
          px-4
        "
      >
        <span
          className="
            text-xl
            font-bold
            text-[#fdd501]
          "
          style={{ fontFamily: '"Comic Octo", cursive' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
