import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import Search from "./Search";

export default function Top_Bar() {
  
  return (
    <section className="w-full">
      <div className="w-full py-1 px-3 md:py-2 flex gap-10 items-center justify-between">
        <SidebarTrigger />
        <Search />
      </div>
      <Separator />
    </section>
  );
}