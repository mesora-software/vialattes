import type { Metadata } from "next";
import { fredoka, geist, changaOne } from "@/lib/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vialattes | Aprenda Física de forma divertida",
    template: "%s | Vialattes",
  },
  description:
    "Explore o universo da Física com o Vialattes! Aprenda através de missões interativas, desafios e uma experiência gamificada.",
  applicationName: "Vialattes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fredoka.variable} ${geist.variable} ${changaOne.variable} min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
