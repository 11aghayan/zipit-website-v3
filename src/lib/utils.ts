import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

import { T_Lang, T_Size_Unit } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function is_lang_valid(lang: string) {
  return lang === "am" || lang === "ru";
}

export function size_unit_map(lang: T_Lang, unit: T_Size_Unit) {
  const map = {
    am: {
      mm: "մմ",
      cm: "սմ",
      m: "մ"
    } as const,
    ru: {
      mm: "мм",
      cm: "см",
      m: "м"
    } as const
  } as const;

  return map[lang][unit];
}

export function get_cookie_store() {
  const cookie_store = document.cookie.split(";").map(v=>v.trim()).reduce((prev, val) => {
    const [key, value] = val.split("=");
    return {
      ...prev,
      [key]: value
    };
  }, {} as { [key: string]: string });
  return cookie_store;
}

export function get_int(val: string) {
  val = val.trim();
  if (val.length < 1) return "";
  if (val.at(-1) === "," || val.at(-1) === ".") return val;
  if (isNaN(Number(val))) return val.slice(0, -1);
  if (val.at(-1) === "-") return val.slice(0, -1);
  if (val === "00") return "0";
  return val;
}