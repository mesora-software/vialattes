import Link from "next/link";
import { fredoka } from "@/lib/fonts/fonts";

type ComingSoonProps = {
  title: string;
  description: string;
};

export default function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <main
      className={`${fredoka.className} relative flex min-h-dvh items-center justify-center overflow-hidden bg-surface-dark px-5 py-12 text-text-primary`}
    >
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-game-panel-edge/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[#CB6CE6]/15 blur-3xl" />

      <section className="relative z-10 w-full max-w-xl rounded-3xl border border-game-panel-edge bg-[#1E153C]/95 px-6 py-12 text-center shadow-2xl sm:px-12">
        <span className="mb-8 inline-block rounded-full border border-game-panel-edge bg-primary-dark px-5 py-2 text-xs font-semibold tracking-widest text-text-primary sm:text-sm">
          VIALATTES • TRANSMISSÃO ESPACIAL
        </span>

        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-game-panel-edge bg-primary-dark text-5xl shadow-lg shadow-game-panel-edge/20">
          🚀
        </div>

        <h1 className="mb-5 text-3xl font-bold text-tertiary sm:text-4xl">
          {title} em desenvolvimento!
        </h1>

        <p className="mb-4 text-base leading-relaxed text-text-primary sm:text-lg">
          {description}
        </p>

        <p className="mb-9 text-sm font-semibold text-tertiary sm:text-base">
          Em breve, uma nova aventura estará disponível!
        </p>

        <Link
          href="/dashboard"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-game-panel-edge px-8 py-3 font-semibold text-white transition-colors hover:bg-[#8C6DC4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDD501]"
        >
          ← Voltar ao Dashboard
        </Link>
      </section>
    </main>
  );
}
