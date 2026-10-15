import Image from "next/image";
import Link from "next/link";

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
      {/* Área principal */}
      <div className="relative isolate flex min-h-screen flex-col">
        {/* Imagem de fundo */}
        <Image
          src="/images/home/vialattes-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover object-[58%_center]"
        />

        {/* Gradiente para melhorar a leitura dos textos */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#091735]/85 via-[#17254b]/55 to-[#07112b]/15" />

        {/* Cabeçalho */}
        <header className="relative z-20 mx-auto flex w-full max-w-350 items-center justify-between gap-4 px-5 py-4 md:px-10">
          <Link href="/" aria-label="Página inicial do Vialattes">
            <Image
              src="/images/home/vialattes-logo.svg"
              alt="Vialattes"
              width={220}
              height={220}
              priority
              className="h-auto w-35 drop-shadow-lg sm:w-45 md:w-55"
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-5 md:gap-8"
          >
            <Link
              href="/"
              className="hidden font-semibold transition-colors hover:text-[#d7ff36] sm:inline"
            >
              Início
            </Link>

            <Link
              href="#sobre"
              className="hidden font-semibold transition-colors hover:text-[#d7ff36] md:inline"
            >
              Sobre
            </Link>

            <Link
              href="#recursos"
              className="hidden font-semibold transition-colors hover:text-[#d7ff36] md:inline"
            >
              Recursos
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
        <section className="mx-auto flex w-full max-w-350 flex-1 items-center px-6 py-12 md:px-12">
          <div className="max-w-155">
            <h1 className="text-5xl leading-[1.05] font-black tracking-tight drop-shadow-[0_4px_3px_#08143a] sm:text-6xl lg:text-7xl">
              Estude Física
              <span className="block">de forma</span>
              <span className="block text-[#d7ff36]">
                divertida!
              </span>
            </h1>

            <p className="mt-7 max-w-130 text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
              No <strong>Vialattes</strong>, você aprende conceitos de
              Física através de missões, jogos e desafios em um
              universo cheio de descobertas.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#d7ff36] bg-linear-to-b from-[#a83cff] to-[#5900c2] px-7 py-4 text-lg font-extrabold shadow-[0_0_20px_rgba(177,255,45,0.25)] transition-transform hover:scale-105 sm:text-xl"
            >
              <span aria-hidden="true">🚀</span>
              Testar Gratuitamente
              <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">
              <span>✓ Sem cadastro</span>
              <span>✓ Missões e desafios</span>
              <span>✓ Aprendizado na prática</span>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section
          id="recursos"
          aria-labelledby="recursos-title"
          className="relative z-10 mx-auto w-full max-w-350 scroll-mt-8 px-5 pb-10 md:px-10"
        >
          <h2 id="recursos-title" className="sr-only">
            Recursos do Vialattes
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex items-center gap-4 rounded-2xl border border-[#b1bff0]/35 bg-[#101b43]/85 p-5 shadow-xl backdrop-blur-md"
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

                  <p className="mt-2 text-sm leading-relaxed text-white/85">
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
        className="scroll-mt-8 bg-[#101a3c] px-6 py-18 text-center"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-[#d7ff36] sm:text-4xl">
            Aprender pode ser uma aventura!
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/85">
            O Vialattes é uma plataforma educacional gamificada
            desenvolvida para complementar o estudo de Física.
            Explore módulos, complete missões interativas e
            conquiste recompensas enquanto desenvolve seus
            conhecimentos.
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

