import { Fredoka, Geist, Changa_One } from "next/font/google";

export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const changaOne = Changa_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-changa-one",
  display: "swap",
});