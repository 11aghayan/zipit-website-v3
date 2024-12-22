"use client";

import { useState } from "react";

import { T_Cart, T_Cart_Props } from "@/app/types";
import { get_cookie_store } from "@/lib/utils";

export function use_cart() {
  const cookie_store = get_cookie_store();
  const [cart, set_cart] = useState<T_Cart>(cookie_store.cart ? JSON.parse(cookie_store.cart) : {});

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
    document.cookie = `cart=${JSON.stringify(updated_cart)}`;
  }

  return { cart, update_cart };
}

