import Cookies from "universal-cookie";

import { T_Cart_Props } from "@/types";


const cookies = new Cookies(null, { path: "/" });
let cart = cookies.get("cart") ?? {};

function update_cart({ item_id, photo_id, qty }: T_Cart_Props) {
  const val = qty > 0 ? {
    item_id,
    qty
  } : undefined
  
  cookies.set("cart", {
    ...(cookies.get("cart") ?? {}),
    [photo_id]: val
  }, { path: "/" });
  cart = cookies.get("cart");
}

function empty_cart() {
  cookies.set("cart", {}, { path: "/" });
  cart = cookies.get("cart");
}

export {
  cart,
  update_cart,
  empty_cart
}

