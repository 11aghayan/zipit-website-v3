"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { T_Content, T_Lang } from "@/types";
import use_content from "@/hooks/use-content";

import { T_Section_Props } from "./Filters_Menu";

type Props = T_Section_Props;

function Count_Section({ header_styles }: Props) {
  const pathname = usePathname();
  const lang = pathname.slice(1, 3) as T_Lang;
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [count, set_count] = useState(search_params.get("count") || "25");
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
  useEffect(() => {
    search_params.set("count", count);
    if (count === "25") search_params.delete("count");
    router.push(`${pathname}?${search_params.toString()}`);
  }, [count]);
    
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>{content?.components.home.Count_Section.header ?? ""}</SidebarGroupLabel>
      <SidebarContent>
        <Select onValueChange={(val) => set_count(val)}>
          <SelectTrigger>
            <SelectValue
              defaultValue={count} 
              placeholder={count}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Count_Section header_styles={header_styles} />
    </Suspense>
  );
}