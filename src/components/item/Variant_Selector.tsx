import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { size_unit_map } from "@/lib/utils";
import { T_Content, T_Item_Full, T_Item_Variant, T_Lang } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  lang: T_Lang,
  variant: T_Item_Variant,
  item: T_Item_Full,
  set_variant: React.Dispatch<React.SetStateAction<T_Item_Variant | undefined>>,
  content: T_Content | undefined
}

export default function Variant_Selector({ content, item, lang, variant, set_variant }: Props) {
  const pathname = usePathname();
  const search_params = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  
  return (
    <Select 
      defaultValue={variant.photo_id}
      onValueChange={val => {
        set_variant(item.variants.find(v => v.photo_id === val));
        search_params.set("variant", val);
        router.push(`${pathname}?${search_params.toString()}`)
      }}
    >
      <div>
        <p className="font-semibold text-sm">{content?.components.item.Item.variants.header ?? ""}</p>
        <SelectTrigger className="bg-white mt-[2px]" >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            item.variants.map((v) => (
              <SelectItem
                key={v.photo_id}
                value={v.photo_id}
              >
                <div className="flex gap-3 justify-between">
                  <div className="flex gap-1 min-w-24">
                    <p className="font-semibold">
                      {content?.components.item.Item.variants.color}:
                    </p>
                    <p>
                      {v.color}
                    </p>
                  </div>
                  <div className="flex gap-1 min-w-24">
                    <p className="font-semibold">
                      {content?.components.item.Item.variants.size}:
                    </p>
                    <p>
                      {v.size_value}{size_unit_map(lang, v.size_unit)}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))
          }
        </SelectContent>
      </div>
    </Select>
  );
}