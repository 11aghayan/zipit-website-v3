import "@/app/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_Armenian, Noto_Sans } from "next/font/google";

import { T_Children } from "@/app/types";

const noto_ru = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  preload: true,
  variable: "--font",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const noto_am = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  preload: true,
  variable: "--font",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "ZIPIT.admin"
};

type Props = T_Children & {
  params: { lang: string }
};

export default async function RootLayout({ children, params }: Props) {
  let { lang } = await params;
  lang = lang === "ru" ? "ru" : "hy";
  const font = lang === "ru" ?  noto_ru : noto_am;

  return (
    <html lang={lang}>
      <body
        className={`${font.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
