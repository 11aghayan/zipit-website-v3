"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { T_Content, T_Item_Response, T_Item_Variant, T_Lang } from "@/types";
import { get_item } from "@/actions/item-actions";
import { Response_Error, Response_Success } from "@/actions/lib";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { size_unit_map } from "@/lib/utils";
import use_content from "@/hooks/use-content";

type Props = {
  id: string,
  lang: T_Lang,
  variant_id: string | undefined
}

export default function Item({ id, lang, variant_id }: Props) {
  const pathname = usePathname();
  const search_params = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  
  const [content, set_content] = useState<T_Content>();
  const [data, set_data] = useState<Response_Error | Response_Success<T_Item_Response>>();
  const [variant, set_variant] = useState<T_Item_Variant>();
  
  useEffect(() => {
    fetch_item()
      .then(res => {
        if (!(res instanceof Response_Error)) {
          const variant = res.data.item.variants.find(v => v.photo_id === variant_id) ?? res.data.item.variants[0]
          set_variant(variant);
        }
      });

    use_content(lang)
      .then(c => set_content(c));
  }, []);
  
  async function fetch_item() {
    const response = await get_item({ id, lang });
    set_data(response);
    return response;
  }
  
  if (!data || !variant) {
    return (
      <p>Loading...</p>
    );
  }
  
  if (data instanceof Response_Error) {
    return (
      <p>{data.data.message}</p>
    );
  }
  
  const { item } = data.data;

  return (
    <div className="rounded-xl flex bg-gray-200 p-3 shadow border">
      <div className="w-full max-w-sm space-y-2">
        <div className="relative w-full aspect-square">
          <Image 
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${variant.photo_id}?width=400&height=400`}
            alt={item.name}
            fill
            className="rounded-md border bg-white"
            loading="lazy"
          />
        </div>
        <Select 
          defaultValue={variant.photo_id}
          onValueChange={val => {
            set_variant(data.data.item.variants.find(v => v.photo_id === val));
            search_params.set("variant", val);
            router.push(`${pathname}?${search_params.toString()}`)
          }}
        >
          <div>
            <p className="font-semibold text-sm">{content?.components.item.Item.variants.header ?? ""}</p>
            <SelectTrigger className="bg-white mt-[2px]" >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {
                data.data.item.variants.map((v) => (
                  <SelectItem
                    key={v.photo_id}
                    value={v.photo_id}
                  >
                    <div className="flex gap-1 justify-between">
                      <div className="flex gap-1 min-w-24">
                        <p className="font-semibold">
                          {content?.components.item.Item.variants.color}:
                        </p>
                        <p>
                          {v.color}
                        </p>
                      </div>
                      <div className="flex gap-1 min-w-24">
                        <p className="font-semibold">
                          {content?.components.item.Item.variants.size}:
                        </p>
                        <p>
                          {v.size_value}{size_unit_map(lang, v.size_unit)}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))
              }
            </SelectContent>
          </div>
        </Select>
      </div>
    </div>
  );
}