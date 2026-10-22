import Link from "next/link";

import HomeHeader from "@/components/home/Homeheader";

const features = [
  {
    icon: "🎮",
    title: "Missões Interativas",
    description: "Aprenda jogando com desafios únicos.",
  },
  {
    icon: "⭐",
    title: "Conquistas e Recompensas",
    description: "Ganhe XP, Lattecoins e insígnias ao evoluir.",
  },
  {
    icon: "📚",
    title: "Conteúdo Estruturado",
    description: "Explore módulos organizados por temas de Física.",
  },
  {
    icon: "🪐",
    title: "Um Universo para Explorar",
    description: "Construa sua colônia e desbloqueie novas possibilidades.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-surface-dark text-white">
      {/* Área principal com background */}
      <div className="relative isolate flex min-h-screen flex-col">
        {/* Background responsivo do header, hero e recursos */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <picture className="absolute inset-0 block">
            <source
              media="(max-width: 767px)"
              srcSet="/images/home/vialattes-hero-mobile.png"
            />

            <img
              src="/images/home/vialattes-hero.png"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </picture>

          {/* Degradê transparente */}
          <div className="absolute inset-0 bg-linear-to-r from-[#091735]/95 via-[#17254b]/30 to-[#07112b]/1" />
        </div>

        {/* Cabeçalho */}
        <HomeHeader />

        {/* Apresentação */}
        <section
          className="
            relative z-10
            mx-auto flex w-full max-w-350
            min-w-0 flex-1 items-center
            px-6 py-12
            sm:px-8
            md:px-12
          "
        >
          <div className="min-w-0 max-w-155">
            <h1
              className="
                hero-title
                font-heading
                text-[clamp(2rem,8vw,3rem)]
                leading-[1.05] font-bold
                tracking-wide
                sm:text-6xl
                lg:text-7xl
              "
            >
              Estude Física
              <span className="block">de forma</span>
            </h1>

            <span
              className="
                relative mt-1 block w-fit
                font-heading
                text-6xl
                font-bold
                tracking-wide
                sm:text-7xl
                lg:text-8xl
              "
            >
              {/* Camada inferior: contorno e sombra */}
              <span
                aria-hidden="true"
                className="
                  hero-title-highlight-outline
                  absolute inset-0
                "
              >
                Divertida!
              </span>

              {/* Camada superior: preenchimento com gradiente */}
              <span className="hero-title-highlight-fill text-vialattes-gradient">
                Divertida!
              </span>
            </span>

            <p
              className="
                mt-7 max-w-130
                text-lg leading-relaxed
                text-white
                [text-shadow:-2px_2px_2px_#000000,0_0_4px_#172b72]
                sm:text-xl
              "
            >
              No <strong>Vialattes</strong>, você aprende conceitos de Física
              através de missões, jogos e desafios em um universo cheio de
              descobertas.
            </p>

            <Link
              href="/dashboard"
              className="
                mt-8 inline-flex
                max-w-full items-center justify-center
                gap-2
                rounded-full
                border-2 border-secondary
                bg-purple-gradient
                px-4 py-3
                text-center text-sm font-extrabold
                shadow-[0_0_10px_rgba(177,255,45,0.25)]
                transition-transform 
                hover:scale-105
                sm:gap-3 sm:px-7 sm:py-4 sm:text-xl
              "
            >
              <span aria-hidden="true">🚀</span>
              Testar Gratuitamente
              <span aria-hidden="true">→</span>
            </Link>

            {/* Indicadores */}
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-white">
              <span className="flex items-center gap-2 rounded-full bg-surface/55 px-3 py-2 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d68aff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Sem cadastro
              </span>

              <span className="flex items-center gap-2 rounded-full bg-surface/55 px-3 py-2 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8abaff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 12h4m-2-2v4" />
                  <path d="M15 13h.01M18 10h.01" />
                  <path d="M6.5 6h11a4 4 0 0 1 3.9 3.1l1.1 6a3 3 0 0 1-5 2.8L15 16H9l-2.5 1.9a3 3 0 0 1-5-2.8l1.1-6A4 4 0 0 1 6.5 6Z" />
                </svg>
                Missões e desafios
              </span>

              <span className="flex items-center gap-2 rounded-full bg-surface/55 px-3 py-2 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#55d5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 20V12h4v8" />
                  <path d="M10 20V7h4v13" />
                  <path d="M16 20V3h4v17" />
                </svg>
                Aprendizado na prática
              </span>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section
          id="recursos"
          aria-labelledby="recursos-title"
          className="
            relative z-10
            mx-auto w-full max-w-350
            scroll-mt-8
            px-5 pb-10
            md:px-10
          "
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="
                  flex items-center gap-4
                  rounded-2xl
                  border border-secondary/35
                  bg-linear-to-br
                  from-surface-light/75
                  via-[#090f2c]/85
                  to-[#090f2c]/85
                  p-5
                  shadow-card
                  backdrop-blur-[2px]
                "
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 text-4xl"
                >
                  {feature.icon}
                </span>

                <div>
                  <h3 className="text-base font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-primary/85">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Sobre */}
      <section
        id="sobre"
        className="scroll-mt-8 bg-surface px-6 py-18 text-center"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-vialattes-gradient text-3xl font-extrabold sm:text-4xl">
            Aprender pode ser uma aventura!
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-text-primary/85">
            O Vialattes é uma plataforma educacional gamificada desenvolvida
            para complementar o estudo de Física. Explore módulos, complete
            missões interativas e conquiste recompensas enquanto desenvolve
            seus conhecimentos.
          </p>

          <Link
            href="/dashboard"
            className="
              mt-8 inline-block
              rounded-full
              border border-border-accent
              bg-green-gradient
              px-8 py-3
              font-extrabold text-primary-dark
              transition-transform
              hover:scale-105
            "
          >
            Começar a explorar →
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-secondary/30 bg-surface-dark px-6 py-6 text-center text-sm text-text-primary/65">
        <p>
          Vialattes — Uma experiência de aprendizagem gamificada.
        </p>

        <p className="mt-2">
          Desenvolvido por Mesora Software.
        </p>
      </footer>
    </main>
  );
}
