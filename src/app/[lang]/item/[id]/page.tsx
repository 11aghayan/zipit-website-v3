import Item from "@/components/item/Item";
import Similar_Items from "@/components/item/Similar_Items";
import use_content from "@/hooks/use-content";
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
    <div className="p-3">
      <Item 
        id={id}
        lang={lang}
        variant_id={variant}
      />
      <Similar_Items />
    </div>
  );
}