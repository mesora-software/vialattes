"use client";

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
   { name: "Background", token: "background" },
   { name: "Surface", token: "surface" },
   { name: "Surface Light", token: "surface-light" },
   { name: "Text Primary", token: "text-primary" },
   { name: "Text Secondary", token: "text-secondary" },
   { name: "Success", token: "success" },
   { name: "Error", token: "error" },
   { name: "Warning", token: "warning" },
   { name: "Hero Outline", token: "hero-outline" },
   { name: "Hero Gradient Top", token: "hero-gradient-top" },
   { name: "Hero Gradient Bottom", token: "hero-gradient-bottom" },
   { name: "Shadow Card", token: "shadow-card" },
   { name: "Shadow Glow Purple", token: "shadow-glow-purple" }  
];

export default function ColorPalette() {
  return (
    <section>
      <h2 className="mb-6 font-heading text-3xl font-bold">
        01. Paleta de cores
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {colors.map(({ name, token }) => (
          <article
            key={token}
            className="overflow-hidden rounded-xl border border-white/15 bg-surface"
          >
            <div
              className="h-28"
              style={{
                backgroundColor: `var(--color-${token})`,
              }}
            />

            <div className="space-y-1 p-4">
              <h3 className="font-bold">{name}</h3>

              <p
                className="font-mono text-sm text-text-secondary"
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

              <code className="text-xs text-secondary">
                {`--color-${token}`}
              </code>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}