import { useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Full, T_Item_Variant } from "@/types";
import Image from "@/components/Image";

type Props = {
  variant: T_Item_Variant,
  item: T_Item_Full,
  size?: number,
  arrows?: boolean,
  open_modal?: () => void
}

export default function Photo_Section({ variant, item, size = 400, arrows = false, open_modal }: Props) {
  const [active_photo_index, set_active_photo_index] = useState(1);

  function next_photo() {
    set_active_photo_index(prev => prev + 1 > variant.photo_count ? 1 : prev + 1);
  }

  function prev_photo() {
    set_active_photo_index(prev => prev - 1 < 1 ? variant.photo_count : prev - 1);
  }

  return (
    <>
      <div 
        className={clsx("group relative w-full aspect-square", { "cursor-pointer": !!open_modal })}
        onClick={() => !!open_modal && open_modal()}
      >
        <Image 
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${variant.photo_id}?width=${size}&height=${size}&index=${active_photo_index}`}
          alt={item.name}
          fill
          className="rounded-md border bg-white"
          loading="lazy"
        />
        {
          arrows && variant.photo_count > 1
          ?
          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              className="absolute rounded-l-md h-full flex items-center justify-start pl-3 w-[10%] left-0 transition-opacity opacity-70 hover:opacity-100"
              style={{
                background: "linear-gradient(to right, rgba(100,100,100,0.5), rgba(100,100,100,0))"
              }}
              onClick={prev_photo}
            >
              <Icon icon="iconamoon:arrow-left-2-duotone" fontSize={32} />
            </button>
            <button
              className="absolute rounded-r-md flex items-center pr-3 justify-end h-full w-[10%] right-0 transition-opacity opacity-70 hover:opacity-100"
              style={{
                background: "linear-gradient(to right, rgba(100,100,100,0), rgba(100,100,100,0.5))"
              }}
              onClick={next_photo}
            >
              <Icon icon="iconamoon:arrow-right-2-duotone" fontSize={32} />
            </button>
          </div>
          :
          null
        }
      </div>
      <div className="flex gap-1 flex-wrap">
        {
          new Array(variant.photo_count).fill(1).map((val, i) => (
            <div 
              key={val + i}
              className={clsx("relative w-full max-w-20 aspect-square", {
                "before:absolute before:inset-0 before:bg-white/70 before:z-30 before:rounded-md": active_photo_index === i + 1
              })}
              onClick={() => set_active_photo_index(i + 1)}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${variant.photo_id}?width=400&height=400&index=${i + 1}`}
                alt={item.name}
                fill
                className="rounded-md border bg-white relative"
                loading="lazy"
              />
            </div>
          ))
        }
      </div>
    </>
  );
}