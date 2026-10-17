type TitleGradientProps = {
  id?: string;
};

export default function TitleGradient({
  id = "vialattes-gradient",
}: TitleGradientProps) {
  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="15"
      x2="0"
      y2="115"
    >
      <stop
        offset="0%"
        stopColor="var(--color-vialattes-gradient-one)"
      />
      <stop
        offset="45%"
        stopColor="var(--color-secondary)"
      />
      <stop
        offset="100%"
        stopColor="var(--color-vialattes-gradient-two)"
      />
    </linearGradient>
  );
}