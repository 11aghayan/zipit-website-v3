
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"; 
import { useState, useEffect, Suspense } from "react";

import { get_all_categories } from "@/actions/category-actions";
import { Response_Error, Response_Success } from "@/actions/lib";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import use_content from "@/hooks/use-content";
import { T_All_Categories_Response, T_Content, T_Lang } from "@/types";
import { Toggle } from "@/components/ui/toggle";

import { T_Section_Props } from "./Filters_Menu";

type Props = T_Section_Props;


function Categories_Section({ header_styles }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  let lang = pathname.slice(1, 3) as T_Lang;
  lang = lang === "ru" ? "ru" : "am";
  const search_params = new URLSearchParams(useSearchParams().toString());

  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Categories_Response>>();
  const [selected_categories, set_selected_categories] = useState<string[]>(search_params.get("categories")?.split(",") || []);
  const [content, set_content] = useState<T_Content>();
  
  async function fetch_categories() {
    const res = await get_all_categories(lang);
    set_data(res);
  }
  
  const header_text = content?.components.home.Categories_Section.header ?? "";
  
  useEffect(() => {
    fetch_categories();
  }, []);
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
  useEffect(() => {
    search_params.set("categories", selected_categories.join(","));
    if (selected_categories.length < 1) search_params.delete("categories");
    router.push(`${pathname}?${search_params.toString()}`)
  }, [selected_categories.length]);
  
  if (!data) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className={header_styles}>{content?.components.home.Categories_Section.header ?? ""}</SidebarGroupLabel>
        <SidebarContent>
          {
            (new Array(39).fill(1)).map((val, i) => (
              <Skeleton 
                key={val + i}
                className="h-12"
              />
            ))
          }
        </SidebarContent>
      </SidebarGroup>
    )
  }
  
  if (data instanceof Response_Error) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className={header_styles}>{header_text}</SidebarGroupLabel>
        <SidebarContent>
          <p className="text-destructive text-center text-lg">{data.data.message}</p>
        </SidebarContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>{header_text}</SidebarGroupLabel>
      <SidebarContent>
        {
          data.data.length > 0 ?
          data.data.categories.map(({ id, label, item_count }) => (
            <Toggle
              key={id}
              variant="outline"
              className="data-[state=on]:bg-amazon data-[state=on]:text-background h-12 flex justify-between gap-5"
              pressed={selected_categories.includes(id)}
              onClick={() => {
                set_selected_categories(prev => {
                  if (selected_categories.includes(id)) {
                    return prev.filter(val => val !== id) 
                  }
                  return [...prev, id];
                })
              }}
              aria-label={label}
            >
              <p className="text-start">
                {label}
              </p>
              <p>{item_count}</p>
            </Toggle>
          ))
          : 
          <p className="text-lg text-center text-gray-300">{content?.components.home.Categories_Section.no_categories ?? ""}</p>
        }
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Categories_Section header_styles={header_styles} />
    </Suspense>
  );
}