import Top_Bar from "@/app/ui/home/Top_Bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Filters_Menu from "@/app/ui/home/Filters_Menu";
import Search from "../ui/home/Search";


export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Filters_Menu />
      <div className="w-full">
        <Top_Bar />
      </div>
    </SidebarProvider>
  );
}