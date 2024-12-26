"use client";

import { useSearchParams } from "next/navigation";

import { T_Lang } from "@/types";
import Suggested_Items from "@/components/Suggested_Items";

type Props = {
  lang: T_Lang
}

export default function Similar_Items({ lang, }: Props) {
  const search_params = new URLSearchParams(useSearchParams().toString());
  return (
    <Suggested_Items 
      lang={lang}
      type="similar"
      search_params={search_params}
    />
  );
}