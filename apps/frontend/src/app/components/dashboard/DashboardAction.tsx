import Image from "next/image";
import Link from "next/link";

interface DashboardActionProps {
  name: string;
  image: string;
  href: string;
  width?: number;
  height?: number;
}

export default function DashboardAction({
  name,
  image,
  href,
  width = 110,
  height = 110,
}: DashboardActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center transition-transform duration-200 hover:scale-105"
    >
      <Image
        src={image}
        alt={name}
        width={width}
        height={height}
        className="relative z-10 object-contain"
      />

      <div
        className="
          -ml-4
          flex
          h-10.5
          min-w-30
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
          className="text-lg font-bold text-[#fdd501]"
          style={{ fontFamily: '"Comic Octo", cursive' }}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}
