import { cardStyles } from "./styles";

const fontFamilies = [
  {
    name: "Fredoka",
    token: "font-heading",
    role: "Títulos e destaques",
    description:
      "Fonte expressiva utilizada em títulos, chamadas e elementos de destaque.",
    sample: "Estude Física!",
    className: "font-heading",
    colorClass: "text-secondary-light",
  },
  {
    name: "Geist",
    token: "font-body",
    role: "Textos e interfaces",
    description:
      "Fonte para leitura, descrições, instruções e elementos da interface.",
    sample: "Explore um universo de descobertas.",
    className: "font-body",
    colorClass: "text-text-primary",
  },
  {
    name: "Changa One",
    token: "font-game",
    role: "Elementos do jogo",
    description:
      "Fonte de destaque para missões, recompensas e indicadores do HUD.",
    sample: "Missão Concluída!",
    className: "font-game",
    colorClass: "text-tertiary",
  },
];

const textHierarchy = [
  {
    label: "H1",
    size: "48px",
    classes: "font-heading text-5xl font-bold",
    sample: "Título principal",
  },
  {
    label: "H2",
    size: "36px",
    classes: "font-heading text-4xl font-bold",
    sample: "Título de seção",
  },
  {
    label: "H3",
    size: "24px",
    classes: "font-heading text-2xl font-semibold",
    sample: "Subtítulo",
  },
  {
    label: "Body",
    size: "16px",
    classes: "font-body text-base",
    sample: "Texto padrão utilizado na interface do Vialattes.",
  },
  {
    label: "Small",
    size: "14px",
    classes: "font-body text-sm",
    sample: "Informações secundárias e descrições auxiliares.",
  },
];

export default function Typography() {
  return (
    <section
      id="typography"
      aria-labelledby="typography-title"
      className="space-y-10"
    >
      {/* Cabeçalho */}
      <header className="space-y-2">
        <p className="font-body text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase">
          Design System / 02
        </p>

        <h2
          id="typography-title"
          className="font-heading text-3xl font-bold text-surface-dark sm:text-4xl"
        >
          Tipografia
        </h2>

        <p className="max-w-2xl font-body text-sm leading-relaxed text-surface-dark sm:text-base">
          Famílias tipográficas, tamanhos e exemplos utilizados na
          interface do Vialattes.
        </p>
      </header>

      {/* Famílias tipográficas */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-semibold text-primary-dark">
          Famílias tipográficas
        </h3>

        <div className="grid gap-4 lg:grid-cols-3">
          {fontFamilies.map((font) => (
            <article
              key={font.token}
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border"
              style={{
                backgroundColor: cardStyles.background,
                borderColor: cardStyles.border,
              }}
            >
              {/* Prévia da fonte */}
              <div className="flex min-h-48 flex-col justify-center gap-5 bg-surface-light p-6">
                <span className="w-fit rounded-full bg-primary-dark px-3 py-1 font-mono text-xs text-text-primary">
                  {font.token}
                </span>

                <p
                  className={`${font.className} ${font.colorClass} text-3xl leading-tight wrap-break-word sm:text-4xl`}
                >
                  {font.sample}
                </p>
              </div>

              {/* Informações */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <h4 className="font-body text-xl font-bold text-surface-dark">
                    {font.name}
                  </h4>

                  <p className="mt-1 font-body text-sm text-primary-dark">
                    {font.role}
                  </p>
                </div>

                <p className="font-body text-sm leading-relaxed text-surface-dark">
                  {font.description}
                </p>

                <div
                  className="mt-auto border-t pt-4"
                  style={{ borderColor: cardStyles.border }}
                >
                  <code className="font-mono text-xs text-tertiary-dark">
                    {font.token}
                  </code>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Hierarquia tipográfica */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-semibold text-primary-dark">
          Hierarquia tipográfica
        </h3>

        <div
          className="overflow-hidden rounded-xl border"
          style={{
            backgroundColor: cardStyles.background,
            borderColor: cardStyles.border,
          }}
        >
          {textHierarchy.map((item, index) => (
            <div
              key={item.label}
              className="grid gap-4 p-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-center sm:p-6"
              style={{
                borderTop:
                  index > 0
                    ? `1px solid ${cardStyles.border}`
                    : undefined,
              }}
            >
              <div className="space-y-1">
                <p className="font-body text-sm font-semibold text-primary-dark">
                  {item.label}
                </p>

                <p className="font-mono text-xs text-surface-dark">
                  {item.size}
                </p>
              </div>

              <div className="min-w-0 space-y-3">
                <p
                  className={`${item.classes} leading-tight text-surface-dark wrap-break-word`}
                >
                  {item.sample}
                </p>

                <code className="block font-mono text-xs leading-relaxed text-primary-dark wrap-break-word">
                  {item.classes}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aplicação no jogo */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-semibold text-primary-dark">
          Aplicação no jogo
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Recompensas */}
          <article
            className="overflow-hidden rounded-xl border"
            style={{
              backgroundColor: cardStyles.background,
              borderColor: cardStyles.border,
            }}
          >
            <div className="p-4">
              <h4 className="font-body text-lg font-bold text-surface-dark">
                Recompensas
              </h4>

              <p className="mt-1 font-body text-sm text-primary-dark">
                Tipografia utilizada nas mensagens de conclusão de missões.
              </p>
            </div>

            <div className="flex min-h-56 flex-col items-center justify-center gap-3 bg-surface px-4 py-8 text-center">
              <p className="font-game text-4xl text-tertiary sm:text-5xl">
                Missão Concluída!
              </p>

              <p className="font-game text-3xl text-secondary-light">
                +150 XP
              </p>

              <p className="font-game text-xl text-text-primary">
                +25 Lattecoins
              </p>
            </div>

            <div className="p-4">
              <code className="font-mono text-xs text-tertiary-dark">
                font-game
              </code>
            </div>
          </article>

          {/* HUD */}
          <article
            className="overflow-hidden rounded-xl border"
            style={{
              backgroundColor: cardStyles.background,
              borderColor: cardStyles.border,
            }}
          >
            <div className="p-4">
              <h4 className="font-body text-lg font-bold text-surface-dark">
                HUD / Dashboard
              </h4>

              <p className="mt-1 font-body text-sm text-primary-dark">
                Indicadores de progresso e patente do jogador.
              </p>
            </div>

            <div className="flex min-h-56 flex-col items-center justify-center gap-4 bg-surface px-4 py-8">
              <div className="rounded-xl border border-primary-light/40 bg-primary-dark px-6 py-3 text-center">
                <p className="font-game text-2xl text-tertiary">
                  1588 XP
                </p>
              </div>

              <div className="rounded-xl border border-primary-light/40 bg-primary-dark px-6 py-3 text-center">
                <p className="font-game text-xl text-text-primary">
                  Recruta
                </p>
              </div>
            </div>

            <div className="p-4">
              <code className="font-mono text-xs text-tertiary-dark">
                font-game
              </code>
            </div>
          </article>
        </div>
      </div>

      {/* Caracteres disponíveis */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-semibold text-primary-dark">
          Amostra de caracteres
        </h3>

        <article
          className="overflow-hidden rounded-xl border"
          style={{
            backgroundColor: cardStyles.background,
            borderColor: cardStyles.border,
          }}
        >
          <div className="p-4">
            <h4 className="font-body text-lg font-bold text-surface-dark">
              Changa One
            </h4>

            <p className="mt-1 font-mono text-xs text-primary-dark">
              font-game
            </p>
          </div>

          <div className="space-y-3 bg-surface-light p-6 font-game text-xl leading-relaxed text-text-primary sm:text-2xl">
            <p className="break-all">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>

            <p className="break-all">
              abcdefghijklmnopqrstuvwxyz
            </p>

            <p>0123456789</p>

            <p>Á É Í Ó Ú Ã Õ Ç</p>
          </div>
        </article>
      </div>
    </section>
  );
}


