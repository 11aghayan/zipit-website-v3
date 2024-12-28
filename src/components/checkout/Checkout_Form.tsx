"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

import { cart, empty_cart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { T_Content, T_Lang } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { send_order } from "@/actions/order-actions";
import { Response_Error } from "@/actions/lib";

type Props = {
  content: T_Content,
  lang: T_Lang
}

export default function Checkout_Form({ content, lang }: Props) {
  const cart_size = Object.keys(cart).length;
  const router  = useRouter();

  const [is_client, set_is_client] = useState(false);
  const [errors, set_errors] = useState<{ [key: string]: string }>({});
  const [response_error, set_response_error] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const [loader_state, set_loader_state] = useState<"loading" | "confirmed">("loading");
  const [form_data, set_form_data] = useState({
    name: "",
    phone: "",
    comment: "",
    address: ""
  });
  const mandatory_fields = ["name", "phone", "address"] as const;

  useEffect(() => {
    set_is_client(true);
  }, [])
  
  async function handle_submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    set_is_loading(true);
    set_loader_state("loading");
    set_errors({});
    set_response_error(""); 

    const err = mandatory_fields.reduce((prev, field) => {
      if (form_data[field].length < 1) {
        return {
          ...prev,
          [field]: content.components.checkout.required_error
        }
      }
      return prev;
    }, {});

    if (Object.keys(err).length > 0) {
      set_errors(err);
      set_is_loading(false);
      return;
    }
    
    const res = await send_order({ ...form_data, cart, lang });

    if (res instanceof Response_Error) {
      set_response_error(res.data.message);
      set_is_loading(false);
      return;
    }
    
    set_loader_state("confirmed");
    setTimeout(() => {
      empty_cart();
      router.replace(`/${lang}`);
    }, 3000);
  }
  
  if (!is_client || !cart || cart_size < 1) return null;

  return (
    <div>
      <div className={clsx("fixed inset-0 bg-white/95 z-30 flex items-center justify-center", is_loading ? "block" : "hidden")}>
        {
          loader_state === "confirmed"
          ?
          <div className="flex flex-col items-center justify-center">
            <Icon icon="icon-park-solid:doc-success" fontSize={52} color="#5d7" />
            <p className="text-2xl">{content.components.checkout.success_msg}</p>
          </div>
          :
          <Icon icon="eos-icons:bubble-loading" fontSize={32} />
        }
      </div> 
      <form 
        onSubmit={handle_submit}
        className="mx-auto w-full max-w-xs flex flex-col gap-2"
      >
        {
          mandatory_fields.map(field => (
            <Label
              key={field}
              className={clsx({ 
                "text-red-400": field in errors
              })}
            >
              {content.components.checkout[field]}*
              <Input 
                type="text"
                value={form_data[field]}
                disabled={is_loading}
                onChange={e => {
                  if (field in errors) {
                    set_errors(prev => { delete prev[field]; return prev });
                  }
                  if (e.target.value.length > 50) {
                    set_errors(prev => ({
                      ...prev,
                      [field]: content.components.checkout.too_long_error_50
                    }))

                    return;
                  };
                  set_form_data(prev => ({ ...prev, [field]: e.target.value }))
                }}
                placeholder={field in errors ? errors[field] : ""}
                className={clsx("mt-1 placeholder:text-red-600/60", {
                  "border border-red-600": field in errors
                })}
              />
              {field in errors && form_data[field].length > 0 
              ? 
              <p className="mt-1 mb-2">{errors[field]}</p>
              : 
              null
              }
            </Label>
          ))
        }
        <Label
          className={clsx({ 
            "text-red-400": "comment" in errors
          })}
        >
          {content.components.checkout.comment}
          <Textarea 
            disabled={is_loading}
            className={clsx("mt-1", {
              "border border-red-600": "comment" in errors
            })}
            value={form_data.comment}
            onChange={e => {
              if ("comment" in errors) {
                set_errors(prev => { delete prev.comment; return prev });
              }
              if (e.target.value.length > 300) {
                set_errors(prev => ({
                  ...prev,
                  comment: content.components.checkout.too_long_error_300
                }))

                return;
              };
              set_form_data(prev => ({ ...prev, comment: e.target.value }))
            }}
          />
          {"comment" in errors && form_data.comment.length > 0 
          ? 
          <p className="mt-1 mb-2">{errors.comment}</p>
          : 
          null
          }
        </Label>
        {
          response_error.length > 0
          ?
          <p className="text-center text-red-500">{response_error}</p>
          :
          null
        }
        <Button 
          type="submit"
          disabled={is_loading}
        >
          {content.components.checkout.submit}
        </Button>
      </form>
    </div>
  );
}