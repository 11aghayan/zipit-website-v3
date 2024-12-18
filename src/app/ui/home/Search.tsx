"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Input } from "@/components/ui/input";

type Props = {
  className?: string;
}

export default function Search({ className }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  const pathname = usePathname();
  
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
          placeholder="Search"
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