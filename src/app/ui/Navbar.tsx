import Link from "next/link";
import { Icon } from "@iconify/react";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { nav_routes } from "@/lib/nav-routes";


export default function Navbar() {
  
  return (
    <NavigationMenu className="w-full max-w-full min-h-[34px] md:min-h-16 bg-black p-2 md:p-5">
      <NavigationMenuList className="space-x-5">
        {
          nav_routes.map(({ href, icon }) => (
            <NavigationMenuItem
              key={href}
            >
              <Link href={href} >
                <Icon icon={icon} className="text-white hover:text-saffron text-lg md:text-2xl" />
              </Link>
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  );
}