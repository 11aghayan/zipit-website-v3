import { OnLoadingComplete, PlaceholderValue, StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageLoader } from "next/image";
import { CSSProperties, Key, ReactEventHandler } from "react";

export const blur_data_url = "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/vzFfwAJKgO3lZNG1AAAAABJRU5ErkJggg=="

type Props = {
  key?: Key
  src: string | StaticImport,
  alt: string,
  width?: number | `${number}`,
  height?: number | `${number}`,
  fill?: boolean,
  sizes?: string,
  loader?: ImageLoader,
  quality?: number | `${number}`,
  priority?: boolean,
  placeholder?: PlaceholderValue,
  style?: CSSProperties,
  onLoadingComplete?: OnLoadingComplete,
  onLoad?: ReactEventHandler<HTMLImageElement>,
  onError?: ReactEventHandler<HTMLImageElement>,
  loading?: "eager" | "lazy",
  blurDataURL?: string,
  overrideSrc?: string,
  className?: string
}

export default function Custom_Image(props: Props) {
  return (
    <Image
      {...props}
      placeholder={props?.placeholder ?? "blur"}
      blurDataURL={props?.blurDataURL ?? blur_data_url}
    />
  );
}