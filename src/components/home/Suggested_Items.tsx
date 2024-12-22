"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { T_All_Items_Response, T_Content, T_Lang } from "@/types";
import { Response_Error, Response_Success } from "@/actions/lib";
import { Skeleton } from "@/components/ui/skeleton";
import { get_suggested_items } from "@/actions/item-actions";
import use_content from "@/hooks/use-content";

import Carousel_Card from "./Carousel_Card";

type Props = {
  lang: T_Lang
}

export default function Suggested_Items({ lang }: Props) {
  const [data, set_data] = useState<Response_Error | Response_Success<T_All_Items_Response>>();
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);

  useEffect(() => {
    fetch_items();
  }, []);
  
  async function fetch_items() {
    const res = await get_suggested_items(lang);
    set_data(res);
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
                <Skeleton className="h-[330px]" />
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
    <div>
      <p className="font-semibold mb-2">
        {content?.components.home.Suggested_Items.header ?? ""}
      </p>
      <Carousel 
        className="mx-auto w-full bg-gray-100/60 p-2"
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000
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
                />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <div 
          className="hidden sm:block absolute top-0 bottom-0 left-0 bg-white w-20"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))"
          }}
        >
          <CarouselPrevious className="w-10 h-10 left-2 top-1/2 -translate-y-1/2" />
        </div>
        <div 
          className="hidden sm:block absolute top-0 bottom-0 right-0 bg-white w-20"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))"
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