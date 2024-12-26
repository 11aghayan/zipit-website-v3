"use client";

import { useState } from "react";
import Cookies from "universal-cookie";

import { T_Cart, T_Cart_Props } from "@/types";

export function use_cart() {
  const cookies = new Cookies(null, { path: "/" });
  const [cart, set_cart] = useState<T_Cart>(cookies.get("cart") ?? {});
  
  function update_cart({ item_id, photo_id, qty }: T_Cart_Props) {
    const updated_cart = {
      ...cart,
      [photo_id]: {
        item_id,
        qty
      }
    };
    if (qty < 1) {
      delete updated_cart[photo_id];
    }
    set_cart(updated_cart);
    cookies.set("cart", updated_cart, { path: "/" });
  }
  
  return { cart, update_cart };
}

