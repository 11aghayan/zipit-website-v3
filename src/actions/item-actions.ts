import { T_All_Items_Response, T_Cart_Props, T_Item_Response, T_Lang } from "@/types";

import { fetch_api, Response_Error } from "./lib";
import use_content from "@/hooks/use-content";

type T_All_Items_Props = {
  special_groups: string,
  categories: string,
  count: string,
  page: string,
  search: string,
  sortby: string,
  lang: T_Lang
}

export async function get_all_items(params: T_All_Items_Props) {
  const content = await use_content(params.lang);
  try {
    const search_params = new URLSearchParams(params).toString();
    const response = await fetch_api<T_All_Items_Response>(`/items/public/all?${search_params}`);
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}

export async function get_suggested_items(lang: T_Lang) {
  const content = await use_content(lang);
  try {
    const response = await fetch_api<T_All_Items_Response>(`/items/public/suggestions?lang=${lang}`);
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}

type T_Single_Item_Props = {
  id: string,
  lang: T_Lang
}

export async function get_item({ id, lang }: T_Single_Item_Props) {
  const content = await use_content(lang);
  try {
    const response = await fetch_api<T_Item_Response>(`/items/item/public/${id}?lang=${lang}`);
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}

type T_Similar_Items_Props = {
  lang: T_Lang,
  search_params: URLSearchParams
}

export async function get_similar_items({ lang, search_params }: T_Similar_Items_Props) {
  const content = await use_content(lang);
  search_params.set("lang", lang);
  try {
    const response = await fetch_api<T_All_Items_Response>(`/items/public/similar?${search_params.toString()}`);
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}

export async function get_cart_items({ lang, items }: { items: T_Cart_Props[] } & { lang: T_Lang }) {
  const content = await use_content(lang);
  const body = JSON.stringify({
    items: items.map(i => ({ item_id: i.item_id, photo_id: i.photo_id }))
  });
  
  try {
    const response = await fetch_api<T_All_Items_Response>(`/items/public/cart?lang=${lang}`, { method: "POST", body });
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}