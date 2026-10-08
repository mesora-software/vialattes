
export default function ModulePath() {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-0 -left-30 h-full w-[calc(100%+225px)]"
      aria-hidden="true"
    >
           
      <path
         d="
            M 0 150
            C 50 150, 50 50, 100 50
            S 250 250, 300 250
            S 450 50, 500 50
            S 650 250, 700 250
            S 850 50, 900 50
            S 1050 250, 1100 250
            S 1150 150, 1200 150
         "
         fill="none"
         stroke="#cb6ce6"
         strokeWidth="4"
         strokeDasharray="10 10"
         strokeLinecap="round"
         strokeOpacity="0.5"
         transform="translate(0, 10)"

      />
    </svg>
  );
}