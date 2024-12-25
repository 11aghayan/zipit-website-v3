"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { T_Content, T_Item_Response, T_Item_Variant, T_Lang } from "@/types";
import { get_item } from "@/actions/item-actions";
import { Response_Error, Response_Success } from "@/actions/lib";
import use_content from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import Add_To_Cart from "@/components/Add_To_Cart";
import Photo_Section from "@/components/Photo_Section";

import Variant_Selector from "./Variant_Selector";
import Item_Info_Section from "./Item_Info_Section";
import Photo_Modal from "../Photo_Modal";

type Props = {
  id: string,
  lang: T_Lang,
  variant_id: string | undefined
}

export default function Item({ id, lang, variant_id }: Props) {
  
  
  const [content, set_content] = useState<T_Content>();
  const [data, set_data] = useState<Response_Error | Response_Success<T_Item_Response>>();
  const [variant, set_variant] = useState<T_Item_Variant>();
  const [is_photo_modal_open, set_is_photo_modal_open] = useState(false);
  
  useEffect(() => {
    fetch_item()
      .then(res => {
        if (!(res instanceof Response_Error)) {
          const variant = res.data.item.variants.find(v => v.photo_id === variant_id) ?? res.data.item.variants[0]
          set_variant(variant);
        }
      });

    use_content(lang)
      .then(c => set_content(c));
  }, []);
  
  async function fetch_item() {
    const response = await get_item({ id, lang });
    set_data(response);
    return response;
  }
  
  if (!data || !variant) {
    return (
      <p>Loading...</p>
    );
  }
  
  if (data instanceof Response_Error) {
    return (
      <p>{data.data.message}</p>
    );
  }
  
  const { item } = data.data;
  
  return (
    <div className="p-3 space-y-3 ">
      <Photo_Modal 
        item={item}
        variant={variant}
        is_open={is_photo_modal_open}
        set_is_open={set_is_photo_modal_open}
      />
      {
        variant.special_group !== null
        ?
        <Badge className={clsx("text-sm px-6 py-3", {
          "bg-group_prm": variant.special_group === "prm",
          "bg-group_liq": variant.special_group === "liq",
          "bg-group_new": variant.special_group === "new",
        })}>
          {content?.components.home.Special_Groups_Section.groups[variant.special_group]}
        </Badge>
        :
        null
      }
      <div className="flex flex-col sm:flex-row gap-6">
        <section className="w-full max-w-sm space-y-2">
          <Photo_Section
            item={item}
            variant={variant}
            open_modal={() => set_is_photo_modal_open(true)}
          />
        </section>
        <section className="flex flex-col gap-2">
          <Variant_Selector 
            content={content}
            item={item}
            lang={lang}
            variant={variant}
            set_variant={set_variant}
          />
          <Item_Info_Section 
            content={content}
            item={item}
            lang={lang}
            variant={variant}
          />
          <div className="space-y-2">
            <Add_To_Cart 
              content={content}
              item_id={id}
              lang={lang}
              min_order_unit={variant.min_order_unit}
              min_order_value={variant.min_order_value}
              photo_id={variant.photo_id}
            />
          </div>
        </section>
      </div>
    </div>
  );
}