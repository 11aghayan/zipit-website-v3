import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "@/components/ui/button";
import { cart, update_cart } from "@/hooks/use-cart";
import { T_Content, T_ID, T_Lang, T_Min_Order_Unit } from "@/types";
import { get_int, min_order_unit_map } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Success_Checkmark from "@/components/Success_Checkmark";

type Props = {
  item_id: T_ID,
  photo_id: T_ID,
  content: T_Content | undefined,
  min_order_value: number,
  min_order_unit: T_Min_Order_Unit,
  lang: T_Lang,
  set_card_shadow_color?: Dispatch<SetStateAction<"red" | "green" | "blue">>
}

export default function Add_To_Cart({ item_id, photo_id, content, min_order_unit, min_order_value, lang, set_card_shadow_color }: Props) {
  const qty_in_cart = cart[photo_id]?.qty ?? 0;
  const [qty, set_qty] = useState<string>(qty_in_cart - min_order_value >= 0 ? qty_in_cart.toString() : (min_order_value - qty_in_cart).toString());  
  const [is_animation_playing, set_is_animation_playing] = useState(false);
  const [error, set_error] = useState("");
  
  function handle_update_cart() {
    if ((qty === "0" || qty === "") && qty_in_cart < 1) {
      if (error.length < 1) {
        set_error(`${content?.components.item.Item.variants.min_order ?? ""}: ${min_order_value} ${min_order_unit_map(lang, min_order_unit, min_order_value)}`);
      }
      return;
    }
    if (qty !== "0" && Number(qty) < min_order_value) {
      if (error.length < 1) {
        set_error(`${content?.components.item.Item.variants.min_order ?? ""}: ${min_order_value} ${min_order_unit_map(lang, min_order_unit, min_order_value)}`);
      }
      return;
    }
    const updated_item = { photo_id, item_id, qty: Number(qty) };
    update_cart(updated_item);
    update_card_shadow_color(qty, Number(qty));
    set_is_animation_playing(true);
    setTimeout(() => {
      set_is_animation_playing(false);
    }, 1000);
  }
  
  function update_card_shadow_color(qty: string, qty_in_cart: number) {
    if (set_card_shadow_color !== undefined) {
      const color = qty === "0" && qty_in_cart > 0 ? "red" : qty_in_cart > 0 ? "green" : "blue";
      set_card_shadow_color(color); 
    }
  }
  
  useEffect(() => {
    if (qty === "0" && qty_in_cart < 1) {
      set_error(`${content?.components.item.Item.variants.min_order ?? ""}: ${min_order_value} ${min_order_unit_map(lang, min_order_unit, min_order_value)}`);
    } else if (qty !== "0" && qty !== "" && Number(qty) < min_order_value) {
      set_error(`${content?.components.item.Item.variants.min_order ?? ""}: ${min_order_value} ${min_order_unit_map(lang, min_order_unit, min_order_value)}`);
    } else if (qty !== "" && min_order_value >= Number(qty)) {
      set_error("");
    }
    update_card_shadow_color(qty, qty_in_cart);
  }, [qty]);
  
  useEffect(() => {
    set_qty(qty_in_cart - min_order_value >= 0 ? qty_in_cart.toString() : (min_order_value - qty_in_cart).toString());
    set_error("");
  }, [photo_id])
  
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex gap-2 w-full">
        <Button 
          className="w-1/3 shadow-none"
          variant="outline"
          onClick={() => set_qty(prev => {
            let next = Number(prev) - 1;
            
            if (next < min_order_value) {
              if (qty_in_cart < 1) {
                next = min_order_value;
              } else {
                next = 0;
              }
            }
            return next.toString()
          })}
        >
          -
        </Button>
        <Input 
          type="text"
          className="text-center w-full bg-white text-black/80 shadow-none"
          value={qty}
          onChange={e => set_qty(get_int(e.target.value))}
        />
        <Button 
          className="w-1/3 shadow-none"
          variant="outline"
          onClick={() => set_qty(prev => {
            let next = Number(prev) + 1;
            if (next < min_order_value) {
              next = min_order_value;
            }
            return next.toString()
          })}
        >
          +
        </Button>
      </div>
      {
        error.length > 1
        ?
        <p className="text-destructive text-center text-sm">{error}</p>
        :
        null
      }
      <Button 
        variant={content && qty_in_cart > 0 && Number(qty) < 1 ? "destructive" : qty_in_cart > 0 ? "green" : "blue"}
        className="w-full p-1 [&_svg]:size-max"
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
              qty_in_cart > 0 && Number(qty) < 1
              ?
              content.components.add_to_cart_btn.remove_from_cart
              :
              qty_in_cart > 0
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
  );
}