import clsx from "clsx";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { available_text, min_order_unit_map, size_unit_map } from "@/lib/utils";
import { T_Content, T_Item_Full, T_Item_Variant, T_Lang } from "@/types";

type Props = {
  lang: T_Lang,
  item: T_Item_Full,
  variant: T_Item_Variant,
  content: T_Content | undefined
}

export default function Item_Info_Section({ item, lang, variant, content }: Props) {
  const title_classes = "text-xs font-bold text-gray-600";
  const value_classes = "font-semibold"
  
  return (
    <>
      <div>
        <Link 
          href={`/${lang}?categories=${item.category_id}`}
          className="text-sm font-bold text-gray-400 hover:text-gray-500"
        >
          {item.category}
        </Link>
        <p className="font-semibold">{item.name}</p>
      </div>
      <Separator />
      <div className="space-y-2">
        <div>
          <p className={`${title_classes}`}>{content?.components.item.Item.variants.available}</p>
          <p className={clsx(`${value_classes}`, {
            "text-red-600": variant.available < 1,
            "text-green-600": variant.available > 0
          })}>{available_text(lang, variant.available > 0)}</p>
        </div>
        <div>
          <p className={`${title_classes}`}>{content?.components.item.Item.variants.size}</p>
          <p className={`${value_classes}`}>
            {
              variant.size_unit === "num" 
              ?
              size_unit_map(lang, variant.size_unit) + variant.size_value
              :
              variant.size_value + size_unit_map(lang, variant.size_unit)
            }
          </p>
        </div>
        <div>
          <p className={`${title_classes}`}>{content?.components.item.Item.variants.color}</p>
          <p className={`${value_classes}`}>{variant.color}</p>
        </div>
        <div>
          <p className={`${title_classes}`}>{content?.components.item.Item.variants.min_order}</p>
          <p className={`${value_classes}`}>{variant.min_order_value} {min_order_unit_map(lang, variant.min_order_unit, variant.min_order_value)}</p>
        </div>
        <div>
          <p className={`${title_classes}`}>{content?.components.item.Item.variants.price}</p>
          <div className="flex items-center gap-3">
            <p className={clsx(`${value_classes}`, variant.promo ? "text-sm line-through": "")}>{variant.price} {content?.common.currency}</p>
            {
              variant.promo
              ?
              <p className={clsx(`${value_classes} text-lg`, {
                "text-group_prm": variant.special_group === "prm",
                "text-group_liq": variant.special_group === "liq"
              })}>{variant.price} {content?.common.currency}</p>
              :
              null
            }
          </div>
        </div>
      </div>
    </>
  );
}