"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Input } from "@/components/ui/input";
import use_content from "@/hooks/use-content";
import { T_Content, T_Lang } from "@/app/types";

type Props = {
  className?: string;
}

export default function Search({ className }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  const pathname = usePathname();
  let lang = pathname.slice(1, 3) as T_Lang;
  lang = (lang === "ru" ? "ru" : "am");
  
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    (async function() {
      const cont = await use_content(lang);
      set_content(cont);
    })()
  }, [lang]);
  
  let timeout_id: NodeJS.Timeout;

  const handle_change = useCallback((text: string) => {
    text = text.length > 100 ? text.slice(0, 100) : text;
    
    const params = new URLSearchParams(search_params.toString());
    params.set("search", text);
    if (!params.get("search")) {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [search_params]);
  
  return (
    <div className={className}>
      <div className="w-full max-w-56 relative">
        <Icon 
          icon="line-md:search" 
          className="absolute top-1/2 -translate-y-1/2 right-2"
        />
        <Input 
          type="text"
          aria-label={content?.app.ui.home.Search["aria-label"]}
          placeholder={content?.app.ui.home.Search.placeholder}
          defaultValue={search_params.get("search") ?? ""}
          className="bg-white pr-8 text-sm"
          onChange={(e) => {
            clearTimeout(timeout_id);
            timeout_id = setTimeout(() => {
              handle_change(e.target.value)
            }, 500);
          }}
        />
      </div>
    </div>
  );
}