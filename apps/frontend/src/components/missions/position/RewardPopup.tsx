"use client";

import Image from "next/image";

interface RewardPopupProps {
  id: string;
  position: number;
  xp: number;
  lattecoins: number;
  onFinish: (id: string) => void;
}

export default function RewardPopup({
  id,
  position,
  xp,
  lattecoins,
  onFinish,
}: RewardPopupProps) {
  return (
    <div
      className="pointer-events-none absolute bottom-24 z-30 -translate-x-1/2"
      style={{
        left: `${((position + 10) / 20) * 100}%`,
      }}
    >
      <div
        className="flex animate-[reward-float_1800ms_ease-out_forwards] flex-col items-center gap-1 whitespace-nowrap"
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) {
            onFinish(id);
          }
        }}
      >
        <div className="flex items-center gap-1 text-sm font-bold text-white drop-shadow-[0_2px_3px_#000]">
          <Image
            src="/images/assets/ui/xp.svg"
            alt="XP"
            width={22}
            height={22}
          />
          <span>+{xp} XP</span>
        </div>

        <div className="flex items-center gap-1 text-sm font-bold text-[#fdd501] drop-shadow-[0_2px_3px_#000]">
          <Image
            src="/images/assets/ui/lattecoin.svg"
            alt="Lattecoins"
            width={22}
            height={22}
          />
          <span>+{lattecoins}</span>
        </div>
      </div>
    </div>
  );
}
