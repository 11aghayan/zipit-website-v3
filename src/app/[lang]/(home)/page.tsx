import Top_Bar from "@/components/home/Top_Bar";
import Item_List from "@/components/home/Item_List";
import { T_Lang, T_Server_Search_Params } from "@/types";
import Suggested_Items from "@/components/Suggested_Items";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<T_Server_Search_Params>
}

export default async function Home({ params, searchParams }: Props) {
  let lang = (await params).lang as T_Lang;
  lang = lang === "ru" ? "ru" : "am";
  const spObj = await searchParams;
  const spStr = Object.entries(spObj).reduce((prev, [key, val]) => {
    if (!val) return prev;
    let string = key + "=" + val;
    if (prev.length > 0) {
      string = "&" + string;
    }
    return prev + string;
  }, "");
  const sp = new URLSearchParams(spStr);
  return (
      <div className="w-full">
        <Top_Bar />
        <section className="p-3 space-y-6">
          <Suggested_Items 
            lang={lang} 
            type="suggested"
          />
          <Item_List lang={lang} />
        </section>
      </div>
  );
}