import { notFound } from "next/navigation";
import ColorPalette from "@/components/design-system/ColorPalette";
import Typography from "@/components/design-system/Typography";

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-16">
      <ColorPalette />
      <Typography />
    </div>  
  );
}
