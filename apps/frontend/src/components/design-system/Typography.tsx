export default function Typography() {
  return (
    <section>
      <h2 className="mb-2 p-6 font-heading text-3xl font-bold">
        02. Tipografia
      </h2>

      <div className="space-y-10 rounded-xl bg-surface p-8">

        {/* Fonte para títulos */}
        <div>
          <p className="mb-4 text-sm text-text-tertiary">
            Fredoka — font-heading
          </p>

          <h3 className="font-heading text-5xl font-bold text-secondary">
            Estude Física!
          </h3>

          <p className="mt-3 font-mono text-xs text-text-tertiary">
            font-heading text-5xl font-bold
          </p>
        </div>

        <div className="border-t border-white/10" />

        {/* Fonte para textos */}
        <div>
          <p className="mb-4 text-sm text-text-tertiary">
            Geist — font-body
          </p>

          <p className="font-body text-lg leading-relaxed">
            Aprenda Física através de missões interativas,
            jogos e desafios em um universo cheio de descobertas.
          </p>

          <p className="mt-3 font-mono text-xs text-text-tertiary">
            font-body text-lg
          </p>
        </div>

        <div className="border-t border-white/10" />

        {/* Hierarquia tipográfica */}
        <div>
          <h3 className="mb-6 font-heading text-xl font-bold">
            Hierarquia tipográfica
          </h3>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs text-text-tertiary">
                H1 — 48px
              </p>
              <h1 className="font-heading text-5xl font-bold">
                Título principal
              </h1>
            </div>

            <div>
              <p className="mb-2 text-xs text-text-tertiary">
                H2 — 36px
              </p>
              <h2 className="font-heading text-4xl font-bold">
                Título de seção
              </h2>
            </div>

            <div>
              <p className="mb-2 text-xs text-text-tertiary">
                H3 — 24px
              </p>
              <h3 className="font-heading text-2xl font-semibold">
                Subtítulo
              </h3>
            </div>

            <div>
              <p className="mb-2 text-xs text-text-tertiary">
                Body — 16px
              </p>
              <p className="font-body text-base">
                Texto padrão utilizado na interface do Vialattes.
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-text-tertiary">
                Small — 14px
              </p>
              <p className="font-body text-sm">
                Texto auxiliar para descrições e informações secundárias.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* Fonte utilizada no jogo */}
      <div>
        <p className="mb-4 text-sm text-text-tertiary">
          Changa One — font-game
        </p>

        <div className="space-y-3 font-game">
          <h3 className="text-4xl text-tertiary">
            Missão Concluída!
          </h3>

          <p className="text-2xl text-secondary-light">
            +150 XP
          </p>

          <p className="text-xl">
            Recruta • 250 Lattecoins
          </p>

          <p className="text-lg">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>

          <p className="text-lg">
            abcdefghijklmnopqrstuvwxyz
          </p>

          <p className="text-lg">
            0123456789
          </p>
        </div>

        <p className="mt-4 font-mono text-xs text-text-tertiary">
          font-game
        </p>
      </div>

      <div className="border-t border-white/10" />

      <div>
        <p className="mb-4 text-sm text-text-tertiary">
          Isometra — font-game
        </p>

        <div className="space-y-4 font-game">
          <h3 className="text-4xl text-tertiary">
            Missão Concluída!
          </h3>

          <p className="text-2xl text-tertiary-light">
            Cinemática
          </p>

          <p className="text-xl">
            +150 XP • 250 Lattecoins
          </p>

          <p className="text-lg">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>

          <p className="text-lg">
            abcdefghijklmnopqrstuvwxyz
          </p>

          <p className="text-lg">
            0123456789
          </p>
        </div>

        <p className="mt-4 font-mono text-xs text-text-tertiary">
          font-game
        </p>
      </div>
    </section>

  );
}
