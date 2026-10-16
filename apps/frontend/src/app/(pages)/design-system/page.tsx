import { notFound } from "next/navigation";
import ColorPalette from "@/components/design-system/ColorPalette";

const colors = [
  { name: "Primary", token: "primary" },
  { name: "Primary Dark", token: "primary-dark" },
  { name: "Secondary", token: "secondary" },
  { name: "Background", token: "background" },
  { name: "Surface", token: "surface" },
  { name: "Surface Light", token: "surface-light" },
  { name: "Text Primary", token: "text-primary" },
  { name: "Text Secondary", token: "text-secondary" },
  { name: "Hero Outline", token: "hero-outline" },
];

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <ColorPalette />
  );
}
