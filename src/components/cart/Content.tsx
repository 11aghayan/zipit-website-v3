import Link from "next/link";
import { cookies } from "next/headers";

import { T_Content, T_Lang } from "@/types";

import Item_List from "./Item_List";
import { Button } from "../ui/button";

type Props = {
  lang: T_Lang,
  content: T_Content
}

export default async function Content({ lang, content }: Props) {
  const cart = JSON.parse((await cookies()).get("cart")?.value ?? "{}");
  const is_cart_empty = Object.keys(cart).length < 1;
  
  return (
    <div>
      <Item_List 
        content={content}
        lang={lang}
      />
      {
        !is_cart_empty
        ? 
        <Link
          href={`/${lang}/checkout`}
          className="block mt-3 w-full max-w-xs mx-auto"
        >
          <Button className="w-full">
            {content.components.cart.forward}
          </Button>
        </Link>
        :
        null
      }
    </div>
  );
}