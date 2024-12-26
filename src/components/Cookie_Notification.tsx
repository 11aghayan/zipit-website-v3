"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";

import { T_Content, T_Lang } from "@/types";
import use_content from "@/hooks/use-content";
import { Button } from "@/components/ui/button";

export default function Cookie_Notification() {
  const lang = usePathname().slice(1, 3) as T_Lang;
  const cookies = new Cookies(null, { path: "/" });
  const [is_read, set_is_read] = useState(cookies.get("cookie_notification") ? Date.now() < Number(cookies.get("cookie_notification")) : false);
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
  function handle_accept() {
    const exp_date = Date.now() + 7 * 24 * 60 * 60 * 1000;
    cookies.set("cookie_notification", exp_date, { path: "/" });
    set_is_read(true);
  }
  
  if (!content) return null;
  
  return (
    !is_read
    ?
    <div className="fixed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bottom-0 inset-x-0 p-6 bg-dark_orange">
      <p>
        {content.common["cookie-notification"].main_text}
      </p>
      <Button
        onClick={handle_accept}
      >
        {content.common["cookie-notification"].button_text}
      </Button>
    </div>
    :
    null
  );
}