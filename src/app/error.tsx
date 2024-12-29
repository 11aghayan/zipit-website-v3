"use client";

import Link from "next/link";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { T_Content } from "@/types";
import use_content from "@/hooks/use-content";

export default function error() {
  const cookies = new Cookies(null, { path: "/" });
  const lang = cookies.get("lang");

  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, []);
  
  return (
    <main className="p-3 pt-6 space-y-6">
      <p className="text-center font-bold text-2xl opacity-60">{content?.components.error.main_text}</p>
      <Link
        href={`/${lang}`}
        className="mx-auto w-fit block"
      >
        <Button variant="secondary">
          {content?.components.error.btn_text}
        </Button>
      </Link>
    </main>
  );
}