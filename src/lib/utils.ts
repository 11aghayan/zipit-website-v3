import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

import { T_Lang, T_Min_Order_Unit, T_Size_Unit } from "@/types";

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

export function min_order_unit_map(lang: T_Lang, unit: T_Min_Order_Unit, qty: number) {
  const type = new Intl.PluralRules("ru-RU").select(qty);
  
  const map = {
    am: {
      cm: "սմ",
      m: "մ",
      roll: "գլանափաթեթ",
      box: "տուփ",
      pcs: "հատ"
    },
    ru: {
      cm: "см",
      m: "м",
      roll: type === "zero" || type === "many" ? "рулонов" : type === "few" ? "рулона" : "рулон",
      box: type === "zero" || type === "many" ? "коробок" : type === "few" ? "коробки" : "коробка",
      pcs: "шт."
    },
  } as const;

  return map[lang][unit];
}

export function available_text(lang: T_Lang, is_available: boolean) {
  const key = is_available ? "available" : "not_available";
  
  const map = {
    available: {
      am: "Առկա է",
      ru: "В наличии"
    },
    not_available: {
      am: "Առկա չէ",
      ru: "Нет в наличии"
    }
  } as const;
  
  return map[key][lang]; 
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


export function format_number(num: string | number) {
  const [int, float] = num.toString().split(".");
  const output_num_reversed: string[] = [];

  for (let i = int.length - 1, l = 1; i >= 0; i--, l++) {
    output_num_reversed.push(int[i])
    if (l % 3 === 0 && i !== 0) output_num_reversed.push(",")
  }
  
  return output_num_reversed.reverse().join("") + `${float ? `.${float}` : ""}`;
}