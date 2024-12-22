import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Content, T_Item_Short, T_Lang } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { get_int, size_unit_map } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import use_content from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { use_cart } from "@/hooks/use-cart"; 
import { Badge } from "@/components/ui/badge";
import Success_Checkmark from "@/components/Success_Checkmark";

type Props = {
  item: T_Item_Short,
  lang: T_Lang
}

export default function Item_Card({ item, lang }: Props) {
  const { cart, update_cart } = use_cart();
  const [content, set_content] = useState<T_Content>();
  const [item_in_cart, set_item_in_cart] = useState(cart[item.photo_id] ? { ...cart[item.photo_id], photo_id: item.photo_id } : { item_id: item.id, photo_id: item.photo_id, qty: 0 });
  const [qty, set_qty] = useState<string>(cart[item.photo_id]?.qty.toString() ?? "1");
  const [is_animation_playing, set_is_animation_playing] = useState(false);
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
    
  
  function handle_update_cart() {
    const updated_item = { ...item_in_cart, qty: Number(qty) };
    set_item_in_cart(updated_item);
    update_cart(updated_item);
    set_is_animation_playing(true);
    setTimeout(() => {
      set_is_animation_playing(false);
    }, 1000);
  }

  return (
    <Card className="flex flex-col hover:bg-gray-100/50 h-[470px] justify-between">
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
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${item.photo_id}?width=250&height=250`} 
            alt={item.name} 
            width={150} 
            height={150} 
            className="m-auto rounded-md w-[150px] h-[150px]"
            loading="lazy"
          />
          <div className="flex w-fit mx-auto pt-6 pb-3">
            <p className="pr-2">{item.color}</p>
            <p className="pl-2 border-l border-gray-700">{item.size_value}{size_unit_map(lang, item.size_unit)}</p>
          </div>
        </CardContent>
      </Link>
      <Separator />
      <CardFooter className="flex-col">
        <div className="flex items-center gap-3 p-3">
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
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex gap-2 w-full">
            <Button 
              className="w-1/3 hover:bg-gray-300"
              variant="outline"
              onClick={() => set_qty(prev => Number(prev) - 1 < 0 ? "0" : (Number(prev) - 1).toString() )}
            >
              -
            </Button>
            <Input 
              type="text"
              className="text-center w-full bg-white"
              value={qty}
              onChange={e => set_qty(get_int(e.target.value))}
            />
            <Button 
              className="w-1/3 hover:bg-gray-300"
              variant="outline"
              onClick={() => set_qty(prev => (Number(prev) + 1).toString())}
            >
              +
            </Button>
          </div>
          <Button 
            variant="outline"
            className="w-full p-1 [&_svg]:size-max hover:bg-gray-300"
            onClick={handle_update_cart}
          >
            {
              is_animation_playing
              ?
              <div>
                <Success_Checkmark />
              </div>
              :
              <>
                {
                  content
                  ?
                  item_in_cart.qty > 0 && Number(qty) < 1
                  ?
                  content.components.add_to_cart_btn.remove_from_cart
                  :
                  item_in_cart.qty > 0
                  ?
                  content.components.add_to_cart_btn.update_cart 
                  :
                  content.components.add_to_cart_btn.add_to_cart 
                  :
                  ""
                }
                <Icon icon="solar:cart-large-4-bold" fontSize={18}/>
              </>
            }
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}