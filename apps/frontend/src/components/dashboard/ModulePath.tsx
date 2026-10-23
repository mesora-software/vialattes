export default function ModulePath() {
  return (
    <>
      {/* Caminho vertical — Mobile e Tablet */}
      <svg
        viewBox="0 0 300 1200"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          lg:hidden
        "
        aria-hidden="true"
      >
        <path
          d="
            M 150 0
            C 150 80, 75 100, 75 200
            S 225 300, 225 400
            S 75 500, 75 600
            S 225 700, 225 800
            S 75 900, 75 1000
            S 150 1120, 150 1200
          "
          fill="none"
          stroke="#ff66c4"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          strokeOpacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Caminho horizontal — Desktop */}
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute top-0 -left-30
          hidden h-full
          w-[calc(100%+225px)]
          lg:block
        "
        aria-hidden="true"
      >
        <path
          d="
            M 0 150
            C 70 150, 90 50, 140 50
            S 250 250, 300 250
            S 450 50, 500 50
            S 650 250, 700 250
            S 850 50, 900 50
            S 1010 250, 1060 250
            S 1150 150, 1200 150
          "
          fill="none"
          stroke="#ff66c4"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          strokeOpacity="0.5"
          transform="translate(0, 10)"
        />
      </svg>
    </>
  );
}
