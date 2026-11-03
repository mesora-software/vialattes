import localFont from "next/font/local";

export const fredoka = localFont({
  src: "./files/Fredoka-VariableFont_wdth,wght.ttf",
  weight: "400 700",
  style: "normal",
  variable: "--font-fredoka",
  display: "swap",
});

export const geist = localFont({
  src: "./files/Geist-VariableFont_wght.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist",
  display: "swap",
});

export const changaOne = localFont({
  src: "./files/ChangaOne-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-changa-one",
  display: "swap",
});
