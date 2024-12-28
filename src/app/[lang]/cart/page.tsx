
import Content from "@/components/cart/Content";
import use_content from "@/hooks/use-content";
import { T_Lang } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang
  }>
}

export default async function Cart({ params }: Props) {
  const { lang } = await params;
  const content = await use_content(lang);
  
  return (
    <div className="p-6 space-y-6">
      <p className="text-center font-bold text-2xl opacity-60">{content.components.cart.header}</p>
      <p className="bg-red-300 -mx-6 px-3 py-6 text-xl font-semibold text-center">
        {content.components.cart.announcement}
      </p>
      <Content 
        content={content}
        lang={lang}
      />
    </div>
  );
}