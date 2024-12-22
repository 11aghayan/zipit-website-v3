import { T_All_Items_Response, T_Lang } from "@/types";

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