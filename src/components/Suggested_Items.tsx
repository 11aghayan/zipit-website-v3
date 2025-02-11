"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { T_All_Items_Response, T_Content, T_Lang } from "@/types";
import { Response_Error, Response_Success } from "@/actions/lib";
import { Skeleton } from "@/components/ui/skeleton";
import { get_similar_items, get_suggested_items } from "@/actions/item-actions";
import use_content from "@/hooks/use-content";

import Carousel_Card from "@/components/Carousel_Card";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

type Props = {
  lang: T_Lang,
  type: "suggested" | "similar"
}

export default function Suggested_Items({ lang, type }: Props) {
  const search_params = new URLSearchParams(useSearchParams().toString());
  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Items_Response>>();
  const [content, set_content] = useState<T_Content>();
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);

  useEffect(() => {
    fetch_items();
  }, [search_params.toString()]);
  
  async function fetch_items() {
    if (type === "suggested") {
      const res = await get_suggested_items(lang);
      set_data(res);
    } else {
      if (!search_params) return;
      if (search_params.get("item_id") === undefined) return;
      if (search_params.get("category_id") === undefined) return;
      if (search_params.get("special_group") === undefined) return;
      if (search_params.get("size_unit") === undefined) return;
      const res = await get_similar_items({ lang, search_params });
      set_data(res);
    }
  }
  
  if (type === "suggested" && search_params.size > 0) {
    return null;
  }
  
  if (!data) {
    return (
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {
            new Array(10).fill(1).map((val, i) => (
              <CarouselItem 
                className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/5"
                key={val + i}
              >
                <Skeleton className="h-[370px]" />
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>
    );
  }
  
  if (data instanceof Response_Error) {
    return null;
  }
  
  return (
    data.data.items_count > 0
    ?
    <div className={clsx("border rounded-xl p-2", type === "suggested" ? "border-oxford_blue/30" : "border-transparent")}>
      <p className={clsx("font-semibold mb-2", type === "suggested" ? "text-oxford_blue" : "text-oxford_blue/70")}>
        {content?.components.Suggested_Items[`header_${type}`] ?? ""}
      </p>
      <Carousel 
        className="mx-auto w-full bg-transparent p-2"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
            stopOnLastSnap: false
          })
        ]}
      >
        <CarouselContent>
          {
            data.data.items.map((item) => (
              <CarouselItem
                key={item.photo_id}
                className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/5"
              >
                <Carousel_Card 
                  item={item} 
                  lang={lang} 
                  content={content}
                  type={type}
                />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <div 
          className="hidden sm:block absolute top-0 bottom-0 left-0 w-24"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0))"
          }}
        >
          <CarouselPrevious className="w-10 h-10 left-2 top-1/2 -translate-y-1/2" />
        </div>
        <div 
          className="hidden sm:block absolute top-0 bottom-0 right-0 w-24"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.7))"
          }}
        >
          <CarouselNext className="w-10 h-10 right-2 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </div>
    :
    null
  );
}