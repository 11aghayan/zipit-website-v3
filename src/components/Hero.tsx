"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import hero_img from "@/../../public/images/hero-image.webp";
import use_content from "@/hooks/use-content";
import { T_Content, T_Lang } from "@/types";

export default function Hero() {
  const lang = usePathname().slice(1, 3);
  const [content, set_content] = useState<T_Content>();

  useEffect(() => {
    use_content(lang as T_Lang)
      .then(c => set_content(c));
  }, [lang]);
  
  return (
    <header className="w-full relative py-2">
      <Link 
        href={`/${lang}`}
        title={content?.components.Hero.title ?? ""}
        aria-label={content?.components.Hero["aria-label"] ?? "Zipit logo, go back to main page"}
      >
        <div className="relative w-full max-w-[200px] md:max-w-[350px] mx-auto aspect-[5.0917]">
          <Image 
            src={hero_img}
            alt="zipit logo hero image"
            fill
            loading="lazy"
          />
        </div>
      </Link>
    </header>
  );
}