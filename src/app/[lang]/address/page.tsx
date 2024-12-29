import Map from "@/components/address/Map";
import use_content from "@/hooks/use-content";
import { T_Lang } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang
  }>
}

export default async function Address({ params }: Props) {
  const lang = (await params).lang;
  const content = await use_content(lang);
  
  return (
    <div className="p-3 space-y-6">
      <p className="text-center text-2xl opacity-80 font-bold">{content.components.address.header}</p>
      <div>
        <p className="text-center">{content.components.address.address} 97/1</p>
        <p className="text-center">{content.components.address.week_days} 10:00-18:00</p>
      </div>
      <Map />
    </div>
  );
}