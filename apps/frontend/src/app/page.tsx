import Image from "next/image";
import Link from "next/link";
import { fredoka } from "./layout";

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
    <main className="min-h-screen overflow-x-hidden bg-[#09112d] text-white">
      {/* Área principal com background */}
      <div className="relative isolate flex min-h-screen flex-col">
        {/* Background do header, hero e recursos */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/home/vialattes-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />

          {/* Degradê transparente */}
          <div className="absolute inset-0 bg-linear-to-r from-[#091735]/85 via-[#17254b]/45 to-[#07112b]/10" />
        </div>

        {/* Cabeçalho */}
        <header className="
                  relative z-20
                  flex h-30 w-full
                  items-center justify-between
                  gap-4
                  border-b border-[#d7ff36]/40
                  bg-linear-to-b from-[#08122f]/90 via-[#14244b]q70 to-[#14244b]/20
                  px-5
                  backdrop-blur-sm
                  md:px-10
                ">
          <Link
           href="/"
           aria-label="Página inicial do Vialattes"
           className="relative flex h-25 w-70 shrink-0 itens-center justify-center"
          >
            <Image
              src="/images/home/vialattes-logo.svg"
              alt="Vialattes"
              fill
              priority
              sizes="180px"
              className="object-contain"
            />
          </Link>

          <nav aria-label="Navegação principal" className="flex items-center gap-5 md:gap-8">
            <Link href="/" className="group relative hidden font-semibold transition-[text-shadow] duration-300 ease-out hover:[text-shadow:0_0_2px_#d7ff36] sm:inline">
              Início
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full bg-[#d7ff36] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
            <Link href="#sobre" className="group relative hidden font-semibold transition-[text-shadow] duration-300 ease-out hover:[text-shadow:0_0_2px_#d7ff36] md:inline">
              Sobre
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full bg-[#d7ff36] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
            <Link href="#recursos" className="group relative hidden font-semibold transition-[text-shadow] duration-300 ease-out hover:[text-shadow:0_0_2px_#d7ff36] md:inline">
              Recursos
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full bg-[#d7ff36] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-[#b48aff] bg-linear-to-b from-[#a342f5] to-[#5200b7] px-4 py-3 text-center text-sm font-bold shadow-lg shadow-purple-950/50 transition-transform hover:scale-105 sm:px-6 sm:text-base"
            >
              Acessar Dashboard <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </header>

        {/* Apresentação */}
        <section className="relative z-10 mx-auto flex w-full max-w-350 flex-1 items-center px-6 py-12 md:px-12">
          <div className="max-w-155">
            <h1 
              className={`
              ${fredoka.className}
                text-5xl leading-[1.05] font-bold
                tracking-wide
                sm:text-6xl lg:text-7xl
              `}
              style={{
                WebkitTextStroke: "6px #32006e",
                paintOrder: "stroke fill",
                textShadow: "-2px 4px 4px #000000",
              }}
            >
              Estude Física
              <span className="block">de forma</span>
            </h1>
              <svg
                viewBox="0 0 600 155"
                className={`mt-1 w-full max-w-150 overflow-visible ${fredoka.className}`}
                role="img"
                aria-label="divertida!"
              >
                <defs>
                  <path
                    id="divertida-curve"
                    d="M 0 85 H 600"
                  />

                  <linearGradient
                    id="divertida-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0" y1="15" x2="0" y2="115"
                  >
                    <stop offset="0%" stopColor="#f3ff8c" />
                    <stop offset="45%" stopColor="#d7ff36" />
                    <stop offset="100%" stopColor="#9acb00" />
                  </linearGradient>
                </defs>

                <text
                  fill="url(#divertida-gradient)"
                  stroke="#32006e"
                  strokeWidth="10"
                  strokeLinejoin="round"
                  paintOrder="stroke fill"
                  fontSize="100"
                  fontWeight="700"
                  letterSpacing="3"
                  textAnchor="middle"
                  style={{
                    filter: "drop-shadow(-2px 4px 1px #000000)",
                  }}           
                >
                  <textPath 
                    href="#divertida-curve"
                    startOffset="40%"
                  >
                    Divertida!
                  </textPath>
                </text>
              </svg>

            <p className="mt-7 max-w-130 text-lg leading-relaxed text-white [-webkit-text-stroke: 30px_#5900c2]
              [text-shadow:3px_4px_8px_#000000,0_0_8px_#172b72] sm:text-xl">
              No <strong>Vialattes</strong>, você aprende conceitos de Física através de missões,
              jogos e desafios em um universo cheio de descobertas.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#d7ff36] bg-linear-to-b from-[#a83cff] to-[#5900c2] px-7 py-4 text-lg font-extrabold shadow-[0_0_20px_rgba(177,255,45,0.25)] transition-transform hover:scale-105 sm:text-xl"
            >
              <span aria-hidden="true">🚀</span>
              Testar Gratuitamente
              <span aria-hidden="true">→</span>
            </Link>

            {/* Indicadores */}
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-white">
              <span className="flex items-center gap-2 rounded-full bg-[#14264e]/55 px-3 py-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d68aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Sem cadastro
              </span>

              <span className="flex items-center gap-2 rounded-full bg-[#14264e]/55 px-3 py-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8abaff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 12h4m-2-2v4" />
                  <path d="M15 13h.01M18 10h.01" />
                  <path d="M6.5 6h11a4 4 0 0 1 3.9 3.1l1.1 6a3 3 0 0 1-5 2.8L15 16H9l-2.5 1.9a3 3 0 0 1-5-2.8l1.1-6A4 4 0 0 1 6.5 6Z" />
                </svg>
                Missões e desafios
              </span>

              <span className="flex items-center gap-2 rounded-full bg-[#14264e]/55 px-3 py-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#55d5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          className="relative z-10 mx-auto w-full max-w-350 scroll-mt-8 px-5 pb-10 md:px-10"
        >
          <h2 id="recursos-title" className="sr-only">Recursos do Vialattes</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex items-center gap-4 rounded-2xl border border-[#b1bff0]/35 bg-linear-to-br from-[#273e72]/75 via-[#090f2c]/85 to-[#090f2c]/85 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-5md"
              >
                <span aria-hidden="true" className="shrink-0 text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="text-base font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Sobre */}
      <section id="sobre" className="scroll-mt-8 bg-[#101a3c] px-6 py-18 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-[#d7ff36] sm:text-4xl">
            Aprender pode ser uma aventura!
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            O Vialattes é uma plataforma educacional gamificada desenvolvida para complementar
            o estudo de Física. Explore módulos, complete missões interativas e conquiste
            recompensas enquanto desenvolve seus conhecimentos.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-full bg-[#d7ff36] px-8 py-3 font-bold text-[#211048] transition-transform hover:scale-105"
          >
            Começar a explorar →
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-white/10 bg-[#090f26] px-6 py-6 text-center text-sm text-white/65">
        <p>Vialattes — Uma experiência de aprendizagem gamificada.</p>
        <p className="mt-2">Desenvolvido por Mesora Software.</p>
      </footer>
    </main>
  );
}

