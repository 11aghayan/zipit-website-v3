"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { T_All_Items_Response, T_Content, T_Lang } from "@/types";
import { get_all_items } from "@/actions/item-actions";
import { Response_Error, Response_Success } from "@/actions/lib";
import use_content from "@/hooks/use-content";

import Item_Card from "./Item_Card";
import Pagination from "./Pagination";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  lang: T_Lang;
}

export default function Item_List({ lang }: Props) {
  const search_params = useSearchParams();
  const page = Number(search_params.get("page") || "1");
  
  const [is_loading, set_is_loading] = useState(true);
  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Items_Response>>();
  const [content, set_content] = useState<T_Content>();

  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
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
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {
          new Array(Number(search_params.get("count") ?? "25")).fill(1).map((val, i) => (
            <Skeleton 
              key={val + i}
              className="h-[470px]"
            />
          ))
        }
      </div>
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
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {
            data.data.items.map((item) => (
              <Item_Card 
                key={item.photo_id}
                item={item}
                lang={lang}
              />
            ))
          }
          </div>
          :
          <p className="text-2xl mt-3 opacity-25 font-semibold text-center">
            {content?.components.home.Item_List.no_items ?? ""}
          </p>
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