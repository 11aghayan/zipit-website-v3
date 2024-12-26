import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Full, T_Item_Variant } from "@/types";
import Photo_Section from "@/components/Photo_Section";
import { Button } from "@/components/ui/button";

type Props = {
  variant: T_Item_Variant,
  item: T_Item_Full,
  is_open: boolean,
  set_is_open: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Photo_Modal({ item, variant, is_open, set_is_open }: Props) {
  return (
    <div 
      className={clsx("fixed inset-0 bg-black/70 z-40 overflow-auto p-2", is_open ? "block" : "hidden")}
      onClick={() => set_is_open(false)}
    >
      <div 
        className="w-full flex flex-col max-w-4xl mx-auto space-y-3"
        onClick={(e) => {e.preventDefault(); e.stopPropagation();}}
      >
        <Button
          className="w-fit self-end bg-transparent text-destructive hover:text-white"
          variant="destructive"
          onClick={() => set_is_open(false)}
        >
          <Icon icon="mingcute:close-line" />
        </Button>
        <Photo_Section 
          item={item}
          variant={variant}
          size={1200}
          arrows
        />
      </div>
    </div>
  );
}