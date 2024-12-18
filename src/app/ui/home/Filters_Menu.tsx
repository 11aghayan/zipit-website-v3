import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";


export default function Filters_Menu() {
  
  return (
    <Sidebar side="left">
      <SidebarContent className="space-y-3 pt-10">
        <SidebarGroup>
          <SidebarGroupLabel>Label</SidebarGroupLabel>
          <SidebarContent>
            <div className="w-10 h-10 bg-gray-600">
              Sidebar
            </div>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}