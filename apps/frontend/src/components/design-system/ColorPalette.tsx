"use client";

import { cardStyles } from "./styles";

const colors = [
  { name: "Primary", token: "primary" },
  { name: "Primary Light", token: "primary-light" },
  { name: "Primary Dark", token: "primary-dark" },
  { name: "Secondary", token: "secondary" },
  { name: "Secondary Light", token: "secondary-light" },
  { name: "Secondary Dark", token: "secondary-dark" },
  { name: "Tertiary", token: "tertiary" },
  { name: "Tertiary Light", token: "tertiary-light" },
  { name: "Tertiary Dark", token: "tertiary-dark" },
  { name: "Surface", token: "surface" },
  { name: "Surface Light", token: "surface-light" },
  { name: "Surface Dark", token: "surface-dark" },
  { name: "Text Primary", token: "text-primary" },
  { name: "Text Secondary", token: "text-secondary" },
  { name: "Text Tertiary", token: "text-tertiary" },
  { name: "Success", token: "success" },
  { name: "Error", token: "error" },
  { name: "Warning", token: "warning" },
  { name: "Hero Outline", token: "hero-outline" },
  { name: "Hero Gradient Top", token: "hero-gradient-top" },
  { name: "Hero Gradient Bottom", token: "hero-gradient-bottom" },
  { name: "Path dashboard", token: "path-dashboard" },
];

type Gradient = {
  name: string;
  className: string;
  description: string;
  direction: string;
  stops: string[];
};

const gradients: Gradient[] = [
  {
    name: "Blue Gradient",
    className: "bg-blue-gradient",
    description:
      "Gradiente vertical utilizado no cabeçalho da página inicial.",
    direction: "Vertical · Top → Bottom",
    stops: [
      "background / 90%",
      "surface / 50%",
      "surface-light / 20%",
    ],
  },

  {
    name: "Purple Gradient",
    className: "bg-purple-gradient",
    description:
      "Gradiente vertical utilizado no botão de destaque do cabeçalho da página inicial.",
    direction: "Vertical · Top → Bottom",
    stops: [
      "primary-light",
      "primary",
      "primary-dark",
    ],
  },
];

export default function ColorPalette() {
  return (
    <section className="space-y-10">
      {/* Cabeçalho */}
      <h2 className="font-heading text-3xl font-bold text-surface-dark">
        01. Paleta de cores
      </h2>

      {/* Cores */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {colors.map(({ name, token }) => (
          <article
            key={token}
            className="overflow-hidden rounded-xl border"
            style={{
              backgroundColor: cardStyles.background,
              borderColor: cardStyles.border,
            }}
          >
            {/* Prévia da cor */}
            <div
              className="h-28"
              style={{
                backgroundColor: `var(--color-${token})`,
              }}
            />

            {/* Informações */}
            <div className="space-y-1 p-4">
              <h3 className="font-body font-bold text-surface-dark">
                {name}
              </h3>

              <p
                className="font-mono text-sm text-primary-dark"
                ref={(element) => {
                  if (!element) return;

                  const value = getComputedStyle(
                    document.documentElement
                  )
                    .getPropertyValue(`--color-${token}`)
                    .trim();

                  element.textContent = value || "Não definido";
                }}
              />

              <code className="text-xs text-tertiary-dark">
                {`--color-${token}`}
              </code>
            </div>
          </article>
        ))}
      </div>

      {/* Gradientes */}
      <div className="space-y-4">
        <div>
          <h3 className="font-heading text-xl font-semibold text-primary-dark">
            Gradientes
          </h3>

          <p className="mt-2 font-body text-sm text-surface-dark">
            Combinações de cores reutilizáveis para fundos e componentes
            da interface.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {gradients.map((gradient) => (
            <article
              key={gradient.className}
              className="overflow-hidden rounded-xl border"
              style={{
                backgroundColor: cardStyles.background,
                borderColor: cardStyles.border,
              }}
            >
              {/* Prévia do gradiente */}
              <div
                className="relative h-56 overflow-hidden"
                style={{
                  backgroundColor: cardStyles.surface,
                }}
              >
                <div
                  className={`absolute inset-0 ${gradient.className}`}
                />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <span className="w-fit rounded-full bg-background/80 px-3 py-1 font-mono text-xs text-text-primary">
                    Preview
                  </span>

                  <p className="font-heading text-2xl font-bold text-text-primary">
                    Vialattes
                  </p>
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-4 p-4">
                <div>
                  <h4 className="font-body text-lg font-bold text-surface-dark">
                    {gradient.name}
                  </h4>

                  <p className="mt-1 font-body text-sm text-primary-dark">
                    {gradient.description}
                  </p>
                </div>

                {/* Cores utilizadas */}
                <div className="flex flex-wrap gap-2">
                  {gradient.stops.map((stop) => (
                    <span
                      key={stop}
                      className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-text-primary"
                    >
                      {stop}
                    </span>
                  ))}
                </div>

                {/* Direção e classe CSS */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                  style={{ borderColor: cardStyles.border }}
                >
                  <span className="font-body text-xs text-primary-dark">
                    {gradient.direction}
                  </span>

                  <code className="rounded-md bg-surface px-3 py-2 font-mono text-xs text-text-primary">
                    {gradient.className}
                  </code>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
