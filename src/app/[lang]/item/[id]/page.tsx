import Item from "@/components/item/Item";
import Similar_Items from "@/components/item/Similar_Items";
import { T_Lang, T_Server_Search_Params } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang, 
    id: string
  }>,
  searchParams: Promise<T_Server_Search_Params>
}

export default async function Item_Page({ params, searchParams }: Props) {
  const { id, lang } = await params;
  const variant = (await searchParams).variant as string | undefined;
  
  return (
    <div className="p-5">
      <Item 
        id={id}
        lang={lang}
        variant_id={variant}
      />
      <section className="mt-10">
        <Similar_Items lang={lang} />
      </section>
    </div>
  );
}