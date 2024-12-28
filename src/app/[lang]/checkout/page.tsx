import Checkout_Form from "@/components/checkout/Checkout_Form";
import use_content from "@/hooks/use-content";
import { T_Lang } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang
  }>
}

export default async function Checkout({ params }: Props) {
  const { lang } = await params;
  const content = await use_content(lang);
  
  return (
    <div className="p-6 space-y-6">
      <p className="text-center font-bold text-2xl opacity-60">{content.components.checkout.header}</p>
      <p className="bg-blue-500 text-white -mx-6 px-3 py-6 text-xl font-semibold text-center">
        {content.components.checkout.info}
      </p>
      <Checkout_Form 
        content={content}
        lang={lang}
      />
    </div>
  );
}