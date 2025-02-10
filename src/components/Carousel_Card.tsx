import Link from "next/link";
import clsx from "clsx";

import { T_Content, T_Item_Short, T_Lang } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { size_unit_map } from "@/lib/utils";
import Image from "@/components/Image";

type Props = {
  item: T_Item_Short,
  lang: T_Lang,
  content: T_Content | undefined,
  type: "suggested" | "similar"
}

export default function Carousel_Card({ item, lang, content, type }: Props) {
  return (
    <Card className={clsx("h-[370px] shadow-none", type === "suggested" ? "bg-oxford_blue/90 hover:bg-oxford_blue/85 text-gray-100" : "bg-white hover:bg-gray-50 text-foreground")}>
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
            width={120} 
            height={160} 
            className="m-auto rounded-md w-[120px] h-[160px]"
            loading="lazy"
          />
          <div className="flex w-fit mx-auto pt-6 pb-3">
            <p className="pr-2">{item.color}</p>
            <p className={clsx("pl-2 border-l", type === "suggested" ? "border-gray-200" : "border-gray-400")}>
              {
                item.size_unit === "num" 
                ?
                size_unit_map(lang, item.size_unit) + item.size_value
                :
                item.size_value + size_unit_map(lang, item.size_unit)
              }
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-3">
          <p className={clsx({
            "line-through text-sm": item.special_group === "prm" || item.special_group === "liq"
          })}>
            {item.price} {content?.common.currency ?? ""}
          </p>
          {
            item.special_group === "liq" || item.special_group === "prm"
            ?
            <p className={clsx(
              "text-lg font-semibold", 
              {
                "text-group_prm": item.special_group === "prm",
                "text-group_liq": item.special_group === "liq"
              }
            )}>
              {item.promo} {content?.common.currency ?? ""}
            </p>
            :
            null
          }
        </CardFooter>
      </Link>
    </Card>
  );
}