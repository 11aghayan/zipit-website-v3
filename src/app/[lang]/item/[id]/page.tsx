import Item from "@/components/item/Item";
import Similar_Items from "@/components/item/Similar_Items";
import { T_Lang } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang, 
    id: string
  }>,
  searchParams: Promise<{ variant: string }>
}

export default async function Item_Page({ params, searchParams }: Props) {
  const { id, lang } = await params;
  const variant = (await searchParams).variant;
  
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