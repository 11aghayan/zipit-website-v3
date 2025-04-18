"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Cookies, { CookieChangeOptions } from "universal-cookie";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { nav_routes } from "@/lib/nav-routes";
import { T_Content, T_Lang } from "@/types";
import use_content from "@/hooks/use-content";


export default function Navbar() {
  const cookies = new Cookies(null, { path: "/" });

  const [content, set_content] = useState<T_Content>();
  const [cart_size, set_cart_size] = useState(0);
  
  const search_params = useSearchParams().toString();
  const pathname_array = usePathname().split("/");
  const lang = pathname_array[1] as T_Lang;
  const next_lang = lang === "am" ? "ru" : "am";
  pathname_array[1] = next_lang;
  const pathname = pathname_array.join("/");
  
  useEffect(() => {
    function cookie_change_listener(c: CookieChangeOptions) {
      if (c.name === "cart") {
        set_cart_size(Object.keys(c.value).length);
      }
    }
    
    cookies.addChangeListener(cookie_change_listener);

    return () => cookies.removeChangeListener(cookie_change_listener)
  }, []);

  useEffect(() => {
      use_content(lang)
        .then(c => set_content(c));
  }, [lang]);


  return (
    <NavigationMenu className="w-full max-w-full justify-between min-h-[44px] md:min-h-16 bg-black p-2 md:p-5">
        <div className="relative h-5 w-full flex-1 mr-4 md:mr-16 overflow-hidden">
          {
            pathname_array[2] !== "cart"
            ?
            <p className="absolute text-nowrap top-1/2 w-fit -right-full -translate-y-1/2 animate-run_line text-white">
              {content?.components.cart.announcement}
            </p>
            :
            null
          }
        </div>
      <NavigationMenuList className="space-x-5">
        {
          nav_routes.map(({ icon, href }) => (
            <NavigationMenuItem
              key={href}
            >
              <Link 
                href={'/' + lang + href} 
                title={content?.components.Navbar.title[href as keyof T_Content["components"]["Navbar"]["title"] ]}
                aria-label={content?.components.Navbar.title[href as keyof T_Content["components"]["Navbar"]["title"] ] ?? href}
                className={clsx(
                  "hover:text-saffron relative",
                    href === `/${pathname_array[2]}` ? "text-saffron" : "text-white "
                  )}
              >
                <Icon icon={icon}  
                  className="text-lg md:text-2xl"
                />
                {
                  href === "/cart"
                  ?
                  <div className={clsx("absolute text-white text-[8px] md:text-xs md:leading-tight leading-snug font-semibold text-center w-[10px] h-[10px] md:w-[14px] md:h-[14px] -top-1 left-3 md:left-4 rounded-full", cart_size > 0 ? "bg-amazon" : "bg-group_new")}>
                    {cart_size}
                  </div> 
                  :
                  null
                }
              </Link>
            </NavigationMenuItem>
          ))
        }
        <NavigationMenuItem>
          <Link 
            href={`${pathname}?${search_params}`}
            title={content?.components.Navbar.title.lang_switch}
            aria-label={content?.components.Navbar.title.lang_switch ?? "Switch language"}
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