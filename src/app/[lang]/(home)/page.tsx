import Top_Bar from "@/app/ui/home/Top_Bar";
import Item_List from "@/app/ui/home/Item_List";
import { T_Lang } from "@/app/types";

type Props = {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: Props) {
  let lang = (await params).lang as T_Lang;
  lang = lang === "ru" ? "ru" : "am";
  
  return (
      <div className="w-full">
        <Top_Bar />
        <section className="p-3 h-full">
          <Item_List lang={lang} />
        </section>
      </div>
  );
}