import Image from "next/image";
import Link from "next/link";

import hero_img from "@/../../public/images/hero-image.webp";

type Props = {
  lang: string;
};

export default function Hero({ lang }: Props) {

  return (
    <div className="w-full max-w-[250px] md:max-w-[350px] mx-auto py-2">
      <Link 
        href={`/${lang}`}
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