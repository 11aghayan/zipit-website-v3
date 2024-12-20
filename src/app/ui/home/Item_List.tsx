"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { T_All_Items_Response, T_Lang } from "@/app/types";
import { get_all_items } from "@/actions/item-actions";
import { Response_Error, Response_Success } from "@/actions/lib";

import Item_Card from "./Item_Card";
import Pagination from "./Pagination";

type Props = {
  lang: T_Lang;
}

export default function Item_List({ lang }: Props) {
  const search_params = useSearchParams();
  const page = Number(search_params.get("page") || "1");
  
  const [is_loading, set_is_loading] = useState(true);
  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Items_Response>>();
  useEffect(() => {
    fetch_items();
  }, [search_params]);
  
  async function fetch_items() {
    set_is_loading(true);
    const res = await get_all_items({
      categories: search_params.get("categories") ?? "",
      count: search_params.get("count") ?? "25",
      lang,
      page: page.toString(),
      search: search_params.get("search") ?? "",
      sortby: search_params.get("sortby") ?? "name_asc",
      special_groups: search_params.get("special_groups") ?? ""
    });
    set_data(res);
    set_is_loading(false);
  }
  
  if (!data || is_loading) {
    return (
      <p>Loading...</p>
    );
  }
  
  if (data instanceof Response_Error) {
    return (
      <p className="text-destructive text-2xl mt-7 font-semibold text-center">
        {data.data.message}
      </p>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {
          data.data.items_count > 0
          ?
          data.data.items.map((item) => (
            <Item_Card 
              key={item.id}
            />
          ))
          :
          <p className="text-2xl mt-3 opacity-25 font-semibold text-center">Ապրանքներ չեն գտնվել</p>
        }
      </div>
      <Pagination 
        page={page}
        pages={data.data.pages}
        lang={lang}
      />
    </div>
  );
}