import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import Categories_Section from "./Categories_Section";
import Special_Groups_Section from "./Special_Groups_Section";
import Count_Section from "./Count_Section";
import Sorting_Section from "./Sorting_Section";

export type T_Section_Props = {
  header_styles: string
}

export default function Filters_Menu() {
  const header_styles = "text-xs font-bold";
  
  return (
    <Sidebar side="left">
      <SidebarContent className="space-y-3">
        <Sorting_Section
          header_styles={header_styles}
        />
        <Count_Section 
          header_styles={header_styles}
        />
        <Special_Groups_Section 
          header_styles={header_styles}
        />
        <Categories_Section
          header_styles={header_styles}
        />
      </SidebarContent>
    </Sidebar>
  );
}