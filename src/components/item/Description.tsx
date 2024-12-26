import { T_Content } from "@/types";

type Props = {
  description: string,
  content: T_Content | undefined
}

export default function Description({ description, content }: Props) {
  
  return (
    <div>
      <p className="font-bold text-sm mb-3">{content?.components.item.Item.variants.description}</p>
      {description}
    </div>
  );
}