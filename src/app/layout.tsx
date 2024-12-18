import "@/app/globals.css";

import type { Metadata } from "next";
import { cookies } from 'next/headers'
import { Noto_Sans_Armenian, Noto_Sans } from "next/font/google";

import { T_Children } from "@/app/types";
import Navbar from "@/app/ui/Navbar";
import Hero from "@/app/ui/Hero";

const noto_ru = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  preload: true,
  variable: "--font-ru",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const noto_am = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  preload: true,
  variable: "--font-am",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "ZIPIT",
  description: "Ոճային և ֆունկցիոնալ պայուսակների աքսեսուարներ ZIPIT-ում։ Գործվածքներից մինչև փականներ՝ ամեն ինչ Ձեր պայուսակների համար։ Откройте для себя стильные и функциональные аксессуары для сумок в ZIPIT. От молний до декоративных подвесок — всё для ваших сумок.",
  openGraph: {
    type: "website",
    url: "https://zipit.am",
    title: "ZIPIT | Գեղեցիկ պայուսակների աքսեսուարներ | Стильные аксессуары для сумок",
    description:
      "ZIPIT-ում կարող եք գտնել պայուսակների բարձրորակ աքսեսուարներ՝ փականներ, դեկորներ և այլն։ Найдите высококачественные аксессуары для сумок в ZIPIT: молнии, ремни и декоративные элементы.",
    images: [
      {
        url: "https://zipit.am/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZIPIT - Գեղեցիկ պայուսակների աքսեսուարներ | Стильные аксессуары для сумок",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIPIT | Պայուսակների ոճային աքսեսուարներ | Стильные аксессуары для сумок ",
    description:
      "Ավելացրեք Ձեր պայուսակներին ոճ և ֆունկցիոնալություն ZIPIT-ի աքսեսուարներով։ Добавьте стиль и функциональность вашим сумкам с аксессуарами ZIPIT.",
    images: ["https://zipit.am/images/og-image.jpg"],
  },
  keywords: [
    "պայուսակի աքսեսուարներ",
    "փականներ",
    "դեկորատիվ զարդեր",
    "պայուսակի ժապավեններ",
    "ZIPIT",
    "zipit.am",
    "գեղեցիկ աքսեսուարներ",
    "պայուսակների աքսեսուարներ",
    "аксессуары для сумок",
    "молнии для сумок",
    "декоративные подвески",
    "ремни для сумок",
    "zipit",
    "стильные аксессуары",
    "высококачественные аксессуары для сумок"
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

type Props = T_Children;

export default async function RootLayout({ children }: Props) {
  const lang = (await cookies()).get("lang")?.value || "am";

  const font = lang === "ru" ? noto_ru : noto_am;
  const html_lang = lang === "ru" ? "ru" : "hy";

  return (
    <html lang={html_lang}>
      <body
        className={`${font.variable} antialiased`}
      >
        <Hero lang={lang} />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
