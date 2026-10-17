"use client";

import { cardStyles } from "./styles";
import TitleGradient from "../ui/gradients/TitleGradient";

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

type Gradient =
  | {
      name: string;
      type: "css";
      className: string;
      description: string;
      direction: string;
      stops: string[];
    }
  | {
      name: string;
      type: "svg";
      description: string;
      direction: string;
      stops: string[];
      component: "hero-title";
    };

const gradients: Gradient[] = [
  {
    name: "Blue Gradient",
    type: "css",
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
    type: "css",
    className: "bg-purple-gradient",
    description:
      "Gradiente vertical utilizado no botão de destaque do cabeçalho da página home.",
    direction: "Vertical · Top → Bottom",
    stops: ["primary-light", "primary", "primary-dark"],
  },
  {
    name: "Vialattes Gradient",
    type: "svg",
    component: "hero-title",
    description:
      "Gradiente SVG utilizado na palavra Divertida! do título principal da Home.",
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
              key={gradient.name}
              className="overflow-hidden rounded-xl border"
              style={{
                backgroundColor: cardStyles.background,
                borderColor: cardStyles.border,
              }}
            >
              {/* Prévia do gradiente */}
              <div
                className="relative flex h-56 items-center justify-center overflow-hidden"
                style={{
                  backgroundColor:
                    gradient.type === "svg"
                      ? "var(--color-surface-light)"
                      : cardStyles.surface,
                }}
              >
                {gradient.type === "css" ? (
                  <>
                    <div
                      className={`absolute inset-0 ${gradient.className}`}
                    />

                    <p className="relative font-heading text-2xl font-bold text-text-primary">
                      Vialattes
                    </p>
                  </>
                ) : gradient.component === "hero-title" ? (
                  <svg
                    viewBox="0 0 600 155"
                    className="w-full max-w-100 overflow-visible font-heading"
                    role="img"
                    aria-label="Prévia do gradiente da palavra Divertida!"
                  >
                    <defs>
                      <TitleGradient id="hero-title-gradient-preview" />
                    </defs>

                    <text
                      x="300"
                      y="105"
                      fill="url(#hero-title-gradient-preview)"
                      fontSize="95"
                      fontWeight="700"
                      textAnchor="middle"
                      className="hero-title-svg"
                    >
                      Divertida!
                    </text>
                  </svg>
                ) : null}
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
                    {gradient.type === "css"
                      ? gradient.className
                      : "TitleGradient"}
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

