import { cardStyles } from "./styles";

export type Gradient = {
  name: string;
  className: string;
  description: string;
  direction: string;
  stops: string[];
};

type GradientCardProps = {
  gradient: Gradient;
  type: "background" | "text";
};

export default function GradientCard({
  gradient,
  type,
}: GradientCardProps) {
  return (
    <article
      className="overflow-hidden rounded-xl border"
      style={{
        backgroundColor: cardStyles.background,
        borderColor: cardStyles.border,
      }}
    >
      {/* Prévia */}
      <div
        className="relative flex h-56 items-center justify-center overflow-hidden"
        style={{
          backgroundColor:
            type === "text"
              ? "var(--color-surface-light)"
              : cardStyles.surface,
        }}
      >
        {type === "background" ? (
          <>
            <div
              className={`absolute inset-0 ${gradient.className}`}
            />

            <p className="relative font-heading text-2xl font-bold text-text-primary">
              Vialattes
            </p>
          </>
        ) : (
          <span className="relative font-heading text-5xl font-bold tracking-wide">
            <span
              aria-hidden="true"
              className="hero-title-highlight-outline absolute inset-0"
            >
              Divertida!
            </span>

            <span
              className={`hero-title-highlight-fill ${gradient.className}`}
            >
              Divertida!
            </span>
          </span>
        )}
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

        {/* Direção e classe */}
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
  );
}