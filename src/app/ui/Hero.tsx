"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import hero_img from "@/../../public/images/hero-image.webp";
import use_content from "@/hooks/use-content";
import { T_Content, T_Lang } from "@/app/types";

export default function Hero() {
  const lang = usePathname().slice(1, 3);
  const [content, set_content] = useState<T_Content>();

  useEffect(() => {
    use_content(lang as T_Lang)
      .then(c => set_content(c));
  }, [lang]);
  
  return (
    <div className="w-full max-w-[200px] md:max-w-[350px] mx-auto py-2">
      <Link 
        href={`/${lang}`}
        title={content?.app.ui.Hero.title ?? ""}
        aria-label={content?.app.ui.Hero["aria-label"] ?? "Zipit logo, go back to main page"}
      >
        <div className="relative mx-auto w-full aspect-[5.0917]">
          <Image 
            src={hero_img}
            alt="zipit logo hero image"
            fill
          />
        </div>
      </Link>
    </div>
  );
}