"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { T_Content, T_Lang } from "@/app/types";
import use_content from "@/hooks/use-content";

import { T_Section_Props } from "./Filters_Menu";

type Props = T_Section_Props;

type T_Sorting = "name_asc" | "name_desc" | "price_asc" | "price_desc";

function Sorting_Section({ header_styles }: Props) {
  const pathname = usePathname();
  const lang = pathname.slice(1, 3) as T_Lang;
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [sorting, set_sorting] = useState<T_Sorting>(search_params.get("sortby") as T_Sorting | undefined || "name_asc");
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
  useEffect(() => {
    search_params.set("sortby", sorting);
    if (sorting === "name_asc") search_params.delete("sortby");
    router.push(`${pathname}?${search_params.toString()}`);
  }, [sorting]);
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>{content?.app.ui.home.Sorting_Section.header ?? ""}</SidebarGroupLabel>
      <SidebarContent>
        <Select onValueChange={(val) => set_sorting(val as typeof sorting)}>
          <SelectTrigger>
            <SelectValue
              defaultValue={sorting} 
              placeholder={content?.app.ui.home.Sorting_Section.sorting[sorting] ?? ""}
            />
          </SelectTrigger>
          <SelectContent>
            {
              (["name_asc", "name_desc", "price_asc", "price_desc"] as T_Sorting[]).map((val) => (
                <SelectItem 
                  key={val}
                  value={val}
                  aria-label={content?.app.ui.home.Sorting_Section.sorting[val] ?? val}
                >
                  {content?.app.ui.home.Sorting_Section.sorting[val] ?? ""}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Sorting_Section header_styles={header_styles} />
    </Suspense>
  );
}