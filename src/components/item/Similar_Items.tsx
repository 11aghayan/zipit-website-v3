"use client";

import { T_Lang } from "@/types";
import Suggested_Items from "@/components/Suggested_Items";

type Props = {
  lang: T_Lang
}

export default function Similar_Items({ lang, }: Props) {
  return (
    <Suggested_Items 
      lang={lang}
      type="similar"
    />
  );
}