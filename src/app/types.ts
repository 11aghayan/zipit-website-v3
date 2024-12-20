export type T_Children = Readonly<{
  children: React.ReactNode;
}>

export type T_Lang = "am" | "ru";
export type T_ID = string;
export type T_Special_Group = "new" | "prm" | "liq";
export type T_Size_Unit = "mm" | "cm" | "m";
export type T_Min_Order_Unit = "pcs" | "cm" | "box" | "roll" | "m";

export type T_Content = {
  app: {
    ui: {
      home: {
        Search: {
          "placeholder": string,
          "aria-label": string
        },
        Categories_Section: {
          "header": string,
          "no_categories": string
        },
        Special_Groups_Section: {
          "header": string,
          "groups": {
            "liq": string,
            "new": string,
            "prm": string
          }
        },
        Count_Section: {
          "header": string
        },
        Sorting_Section: {
          "header": string,
          "sorting": {
            "name_asc": string,
            "name_desc": string,
            "price_asc": string,
            "price_desc": string
          }
        },
        Pagination: {
          "previous_text": string,
          "next_text": string
        }
      },
      Navbar: {
        "title": {
          "/contacts": string,
          "/address": string,
          "/cart": string,
          "lang_switch": string
        }
      },
      Hero: {
        "title": string,
        "aria-label": string
      }
    }
  },
  actions: {
    something_went_wrong_error: "Ինչ-որ բան սխալ է գնացել"
  }
}

export type T_Category = {
  id: T_ID,
  label: string,
  item_count: string
}

export type T_All_Categories_Response = {
  length: number,
  categories: T_Category[]
}

export type T_Item_Short = {
  id: T_ID;
  name_ru: string;
  photo_id: T_ID;
  price: number;
  promo: number | null;
  special_group: T_Special_Group | null;
  size_value: number;
  size_unit: T_Size_Unit;
  color_ru: string;
  count: string;
}

export type T_All_Items_Response = {
  items_count: number,
  pages: number,
  items: T_Item_Short[]
}
  