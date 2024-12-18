import Image from "next/image";
import Link from "next/link";

import hero_img from "@/../../public/images/hero-image.webp";
import use_content from "@/hooks/use-content";
import { T_Lang } from "@/app/types";

type Props = {
  lang: string;
};

export default async function Hero({ lang }: Props) {
  const content = await use_content(lang as T_Lang);
  
  return (
    <div className="w-full max-w-[200px] md:max-w-[350px] mx-auto py-2">
      <Link 
        href={`/${lang}`}
        title={content.app.ui.Hero.title}
        aria-label={content.app.ui.Hero["aria-label"]}
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