import { T_All_Categories_Response, T_Lang } from "@/app/types";

import { fetch_api, Response_Error} from "./lib";
import use_content from "@/hooks/use-content";

export async function get_all_categories(lang: T_Lang) {
  const content = await use_content(lang);
  try {
    const response = await fetch_api<T_All_Categories_Response>(`/categories/public?lang=${lang}`);
    return response;
  } catch (error) {
    return new Response_Error(500, { message: content.actions.something_went_wrong_error }, error);
  }
}