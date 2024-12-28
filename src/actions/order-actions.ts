import use_content from "@/hooks/use-content";
import { T_Cart, T_Lang } from "@/types"

import { fetch_api, Response_Error } from "./lib";

type T_Send_Order_Props = {
  name: string,
  phone: string,
  address: string,
  comment: string,
  cart: T_Cart,
  lang: T_Lang
}

export async function send_order({ address, cart, comment, name, phone, lang }: T_Send_Order_Props) {
  const content = await use_content(lang);

  const order = Object.keys(cart).reduce((prev, photo_id) => ({
    ...prev,
    [photo_id]: cart[photo_id].qty
  }), {});
  
  const body = JSON.stringify({
    name, 
    address,
    comment,
    phone,
    order
  });
  
  try {
    const response = await fetch_api("/order", { method: "POST", body });
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}