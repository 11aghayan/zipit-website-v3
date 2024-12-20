import { T_Children } from "@/app/types";
import Filters_Menu from "@/app/ui/home/Filters_Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = T_Children;

export default function Home_Layout({ children }: Props) {
  
  return (
    <SidebarProvider defaultOpen={false}>
      <Filters_Menu />
      {children}
    </SidebarProvider>
  );
}