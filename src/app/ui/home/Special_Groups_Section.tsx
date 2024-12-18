"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { T_Content, T_Lang } from "@/app/types";
import use_content from "@/hooks/use-content";

import { T_Section_Props } from "./Filters_Menu";

type Props = T_Section_Props;

function Special_Groups_Section({ header_styles }: Props) {
  const pathname = usePathname();
  const lang = pathname.slice(1, 3) as T_Lang;
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [content, set_content] = useState<T_Content>();
  const [special_groups, set_special_groups] = useState<("liq" | "prm" | "new")[]>(search_params.get("special_groups")?.split(",") as ("liq" | "prm" | "new")[] | undefined || []);
  
  useEffect(() => {
    (async function() {
      const c = await use_content(lang);
      set_content(c);
    })();
  }, [lang]);
  
  useEffect(() => {
    search_params.set("special_groups", special_groups.join(","));
    if (special_groups.length < 1) search_params.delete("special_groups");
    router.push(`${pathname}?${search_params.toString()}`);
  }, [special_groups.length])

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>{content?.app.ui.home.Special_Groups_Section.header}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        {
          (["liq", "prm", "new"] as typeof special_groups).map((group) => (
            <Toggle
              key={group}
              variant="outline"
              className="data-[state=on]:bg-saffron"
              pressed={special_groups.includes(group)}
              onClick={() => {
                set_special_groups(prev => {
                  if (special_groups.includes(group)) {
                    return prev.filter(g => g !== group) 
                  }
                  return [...prev, group];
                })
              }}
              aria-label={content?.app.ui.home.Special_Groups_Section.groups[group] ?? group}
            >
              {content?.app.ui.home.Special_Groups_Section.groups[group] ?? ""}
            </Toggle>
          ))
        }
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Special_Groups_Section header_styles={header_styles} />
    </Suspense>
  );
}