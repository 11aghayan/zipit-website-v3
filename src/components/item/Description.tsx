import { T_Lang } from "@/types";

type Props = {
  description: string,
  lang: T_Lang
}

export default function Description({ description, lang }: Props) {
  
  return (
    <div>
      <p className="font-bold text-sm mb-3">Description</p>
      {description}
    </div>
  );
}