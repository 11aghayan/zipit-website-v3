"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { nav_routes } from "@/lib/nav-routes";
import { T_Content, T_Lang } from "@/app/types";
import use_content from "@/hooks/use-content";


export default function Navbar() {
  const [content, set_content] = useState<T_Content>();
  
  const search_params = useSearchParams().toString();
  const pathname_array = usePathname().split("/");
  const lang = pathname_array[1] as T_Lang;
  const next_lang = lang === "am" ? "ru" : "am";
  pathname_array[1] = next_lang;
  const pathname = pathname_array.join("/");
  
  useEffect(() => {
      use_content(lang)
        .then(c => set_content(c));
  }, [lang]);

  return (
    <NavigationMenu className="w-full max-w-full min-h-[34px] md:min-h-16 bg-black p-2 md:p-5">
      <NavigationMenuList className="space-x-5">
        {
          nav_routes.map(({ icon, href }) => (
            <NavigationMenuItem
              key={href}
            >
              <Link 
                href={lang + href} 
                title={content?.app.ui.Navbar.title[href as keyof T_Content["app"]["ui"]["Navbar"]["title"] ]}
                aria-label={content?.app.ui.Navbar.title[href as keyof T_Content["app"]["ui"]["Navbar"]["title"] ] ?? href}
              >
                <Icon icon={icon} className={clsx(
                  "hover:text-saffron text-lg md:text-2xl",
                    href === `/${pathname_array[2]}` ? "text-saffron" : "text-white "
                  )} />
              </Link>
            </NavigationMenuItem>
          ))
        }
        <NavigationMenuItem>
          <Link 
            href={`${pathname}?${search_params}`}
            title={content?.app.ui.Navbar.title.lang_switch}
            aria-label={content?.app.ui.Navbar.title.lang_switch ?? "Switch language"}
            onClick={() => {
              document.documentElement.lang = next_lang === "ru" ? "ru" : "hy"
            }}
          >
            {
              lang === "am"
              ?
              <Icon icon="twemoji:flag-russia" className="text-lg md:text-2xl" />
              :
              <Icon icon="twemoji:flag-armenia" className="text-lg md:text-2xl" />
            }
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}