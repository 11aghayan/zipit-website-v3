import Top_Bar from "@/app/ui/home/Top_Bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Filters_Menu from "@/app/ui/home/Filters_Menu";


export default async function Home() {
  return (
      <div className="w-full">
        <SidebarProvider defaultOpen={false}>
          <Filters_Menu />
          <Top_Bar />
        </SidebarProvider>
      </div>
  );
}