import Top_Bar from "@/components/home/Top_Bar";
import Item_List from "@/components/home/Item_List";
import { T_Lang } from "@/types";
import Suggested_Items from "@/components/home/Suggested_Items";

type Props = {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: Props) {
  let lang = (await params).lang as T_Lang;
  lang = lang === "ru" ? "ru" : "am";
  
  return (
      <div className="w-full">
        <Top_Bar />
        <section className="p-3 space-y-6 h-full">
          <Suggested_Items lang={lang} />
          <Item_List lang={lang} />
        </section>
      </div>
  );
}