import { T_All_Categories_Response, T_Lang } from "@/app/types";

import { fetch_api, Response_Error} from "./lib";

export async function get_all_categories(lang: T_Lang) {

  try {
    const response = await fetch_api<T_All_Categories_Response>(`/categories/public?lang=${lang}`);
    return response;
  } catch (error) {
    console.debug(error);
    return new Response_Error(500, { message: "Something went wring" });
  }
}