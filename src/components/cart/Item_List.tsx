"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { T_All_Items_Response, T_Cart_Props, T_Content, T_Lang } from "@/types";
import { Response_Error, Response_Success } from "@/actions/lib";
import { get_cart_items } from "@/actions/item-actions";
import { Skeleton } from "@/components/ui/skeleton";
import Item_Card from "@/components/Item_Card";
import { format_number } from "@/lib/utils";

type Props = {
  lang: T_Lang,
  content: T_Content
}

export default function Item_List({ lang, content }: Props) {
  const cookies = new Cookies(null, { path: "/" });
  const [cart, set_cart] = useState(cookies.get("cart") ?? {});
  const [is_loading, set_is_loading] = useState(true);
  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Items_Response>>();

  useEffect(() => {
    fetch_items();
  }, []);
  
  useEffect(() => {
    cookies.addChangeListener(() => {
      set_cart(cookies.get("cart") ?? {});
    });
  }, []);
  
  async function fetch_items() {
    set_is_loading(true);
    const items: T_Cart_Props[] = [];
    for (let photo_id in cart) {
      const obj = cart[photo_id];
      items.push({
        photo_id,
        item_id: obj.item_id,
        qty: obj.qty
      });
    }
    const res = await get_cart_items({ items, lang });
    set_data(res);
    set_is_loading(false);
  }
  
  if (!data || is_loading) {
    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {
          new Array(5).fill(1).map((val, i) => (
            <Skeleton
              key={val + i}
              className="h-[510px]"
            />
          ))
        }
      </div>
    );
  }
  
  if (data instanceof Response_Error) {
    return (
      <p className="text-destructive text-2xl mt-7 font-semibold text-center">
        {data.data.message}
      </p>
    );
  }
  
  if (data.data.items_count < 1) {
    return (
      <p className="text-center opacity-30 text-3xl">{content.components.cart.empty_cart}</p>
    );
  }
  
  const total_price = data.data.items.reduce((prev, val) => {
    return prev + ((val.promo ?? val.price) * cart[val.photo_id].qty);
  }, 0);
  
  return (
    <div className="space-y-3">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {
          data.data.items.map((item) => (
            <Item_Card 
              key={item.photo_id}
              item={item}
              lang={lang}
            />
          ))
        }
      </div>
      <p className="text-center font-semibold text-lg">
        {content.components.cart.total}: <span className="font-medium">{format_number(total_price)} {content.common.currency}</span>
      </p>
    </div>
  );
}