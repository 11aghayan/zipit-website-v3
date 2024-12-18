"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { nav_routes } from "@/lib/nav-routes";
import { usePathname, useSearchParams } from "next/navigation";


export default function Navbar() {
  const search_params = useSearchParams().toString();
  const pathname_array = usePathname().split("/");
  const lang = pathname_array[1];
  const next_lang = lang === "am" ? "ru" : "am";
  pathname_array[1] = next_lang;
  const pathname = pathname_array.join("/");
  

  return (
    <NavigationMenu className="w-full max-w-full min-h-[34px] md:min-h-16 bg-black p-2 md:p-5">
      <NavigationMenuList className="space-x-5">
        {
          nav_routes.map(({ icon, href }) => (
            <NavigationMenuItem
              key={href}
            >
              <Link href={href}>
                <Icon icon={icon} className="text-white hover:text-saffron text-lg md:text-2xl" />
              </Link>
            </NavigationMenuItem>
          ))
        }
        <NavigationMenuItem>
          <Link href={`${pathname}?${search_params}`}>
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