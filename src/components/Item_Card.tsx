import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { T_Content, T_Item_Short, T_Lang } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format_number, min_order_unit_map, size_unit_map } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import use_content from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import Add_To_Cart from "@/components/Add_To_Cart";
import Image from "@/components/Image";
import { cart } from "@/hooks/use-cart";

type Props = {
  item: T_Item_Short,
  lang: T_Lang
}

export default function Item_Card({ item, lang }: Props) {
  const [content, set_content] = useState<T_Content>();
  const [shadow_color, set_shadow_color] = useState<"blue" | "green" | "red">(Number(cart[item.photo_id]?.qty) > 0 ? "green" : "blue");
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);

  return (
    <Card className={clsx("flex shadow-[1px_1px_8px_1px] outline-1 flex-col  hover:bg-gray-100/50 h-[560px] justify-between", {
      "shadow-sky-700/40": shadow_color === "blue",
      "shadow-amazon/40": shadow_color === "green",
      "shadow-destructive/40": shadow_color === "red",
    })}>
      <Link 
        href={`/${lang}/item/${item.id}?variant=${item.photo_id}`}
        aria-label={content?.components.home.Item_Card["aria-label"].replace("{{item_name}}", item.name) ?? ""}
        className="rounded-t-xl transition-colors"
      >
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <CardTitle>{item.name}</CardTitle>
          {
            item.special_group
            ?
            <Badge 
              className={clsx(
                "pointer-events-none",
                {
                  "bg-group_prm": item.special_group === "prm",
                  "bg-group_liq": item.special_group === "liq",
                  "bg-group_new": item.special_group === "new",
                }
              )}>
                {content?.components.home.Special_Groups_Section.groups[item.special_group]}
            </Badge>
            :
            null
          }
        </CardHeader>
        <CardContent>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${item.photo_id}?width=450&height=600`} 
            alt={item.name} 
            width={150} 
            height={200} 
            className="m-auto rounded-md w-[150px] h-[200px] bg-white"
            loading="lazy"
          />
          <div className="flex w-fit mx-auto pt-6 pb-1">
            <p className="pr-2">{item.color}</p>
            <p className="pl-2 border-l border-gray-700">
              {
                item.size_unit === "num" 
                ?
                size_unit_map(lang, item.size_unit) + item.size_value
                :
                item.size_value + size_unit_map(lang, item.size_unit)
              }
            </p>
          </div>
          <div className="flex w-fit mx-auto pb-3 text-xs">
            <p className="pr-1">{content?.components.item.Item.variants.min_order}:</p>
            <p>{item.min_order_value} {min_order_unit_map(lang, item.min_order_unit, item.min_order_value)}</p>
          </div>
        </CardContent>
      </Link>
      <Separator />
      <CardFooter className="flex-col">
        <div className="flex items-center gap-3 p-3">
          <p className={clsx({
            "line-through text-sm": item.special_group === "prm" || item.special_group === "liq"
          })}>
            {format_number(item.price)} {content?.common.currency ?? ""}
          </p>
          {
            (item.special_group === "liq" || item.special_group === "prm") && item.promo
            ?
            <p className={clsx(
              "text-lg font-semibold", 
              {
                "text-group_prm": item.special_group === "prm",
                "text-group_liq": item.special_group === "liq"
              }
            )}>
              {format_number(item.promo)} {content?.common.currency ?? ""}
            </p>
            :
            null
          }
        </div>
        <div className="space-y-2 flex-1">
          <Add_To_Cart 
            content={content}
            item_id={item.id}
            photo_id={item.photo_id}
            min_order_unit={item.min_order_unit}
            min_order_value={item.min_order_value}
            lang={lang}
            set_card_shadow_color={set_shadow_color}
          />
        </div>
      </CardFooter>
    </Card>
  );
}