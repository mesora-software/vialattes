"use client";

import { cardStyles } from "./styles";
import GradientCard from "./GradientCard";

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
  { name: "Vialattes Gradiente 01", token: "vialattes-gradient-one" },
  { name: "Vialattes Gradiente 02", token: "vialattes-gradient-two" },
  { name: "Path dashboard", token: "path-dashboard" },
];

type Gradient = {
  name: string;
  className: string;
  description: string;
  direction: string;
  stops: string[];
};

const backgroundGradients: Gradient[] = [
  {
    name: "Blue Gradient",
    className: "bg-blue-gradient",
    description:
      "Gradiente vertical utilizado no background do Header da página inicial.",
    direction: "Vertical · Top → Bottom",
    stops: [
      "surface-dark / 90%",
      "surface / 50%",
      "surface-light / 20%",
    ],
  },
  {
    name: "Purple Gradient",
    className: "bg-purple-gradient",
    description:
      "Gradiente vertical utilizado nos botões de destaque da Home.",
    direction: "Vertical · Top → Bottom",
    stops: [
      "primary-light / 0%",
      "primary / 50%",
      "primary-dark / 100%",
    ],
  },
];

const textGradients: Gradient[] = [
  {
    name: "Vialattes Gradient",
    className: "text-vialattes-gradient",
    description:
      "Gradiente de texto utilizado na palavra Divertida! do título principal da Home.",
    direction: "Vertical · Top → Bottom",
    stops: [
      "vialattes-gradient-one / 0%",
      "secondary / 45%",
      "vialattes-gradient-two / 100%",
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
        <div className="space-y-10">

          {/* Gradientes de Fundo */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-xl font-semibold text-primary-dark">
                Gradientes de Fundo
              </h3>

              <p className="mt-2 font-body text-sm text-surface-dark">
                Combinações de cores reutilizáveis para fundos e componentes
                da interface.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {backgroundGradients.map((gradient) => (
                <GradientCard
                  key={gradient.className}
                  gradient={gradient}
                  type="background"
                />
              ))}
            </div>
          </div>

          {/* Gradientes de Texto */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-xl font-semibold text-primary-dark">
                Gradientes de Texto
              </h3>

              <p className="mt-2 font-body text-sm text-surface-dark">
                Gradientes utilizados em títulos e elementos tipográficos
                da interface.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {textGradients.map((gradient) => (
                <GradientCard
                  key={gradient.className}
                  gradient={gradient}
                  type="text"
                />
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}

