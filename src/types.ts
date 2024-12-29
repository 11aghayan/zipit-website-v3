export type T_Children = Readonly<{
  children: React.ReactNode;
}>

export type T_Lang = "am" | "ru";
export type T_ID = string;
export type T_Special_Group = "new" | "prm" | "liq";
export type T_Size_Unit = "mm" | "cm" | "m";
export type T_Min_Order_Unit = "pcs" | "cm" | "box" | "roll" | "m";

export type T_Content = {
  components: {
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
      },
      Item_List: {
        "no_items": string
      },
      Item_Card: {
        "aria-label": string
      }
    },
    item: {
      Item: {
        variants: {
          "header": string,
          "color": string,
          "size": string,
          "min_order": string,
          "description": string,
          "available": string,
          "price": string
        }
      }
    },
    cart: {
      "header": string,
      "empty_cart": string,
      "forward": string,
      "announcement": string,
      "total": string
    },
    checkout: {
      "header": string,
      "submit": string,
      "email": string,
      "phone": string,
      "name": string,
      "comment": string,
      "info": string,
      "address": string,
      "required_error": string,
      "too_long_error_50": string,
      "too_long_error_300": string,
      "success_msg": string
    },
    address: {
      "header": string,
      "address": string,
      "working_hours": string,
      "week_days": string
    },
    contacts: {
      "header": string
    },
    not_found: {
      "main_text": string,
      "btn_text": string
    },
    error: {
      "main_text": string,
      "btn_text": string
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
    },
    add_to_cart_btn: {
      "add_to_cart": string,
      "remove_from_cart": string,
      "update_cart": string
    },
    Suggested_Items: {
      "header_suggested": string,
      "header_similar": string
    }
  },
  actions: {
    something_went_wrong_error: "Ինչ-որ բան սխալ է գնացել"
  },
  common: {
    "currency": string,
    "cookie-notification": {
      "main_text": string,
      "button_text": string
    }
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
  id: T_ID,
  name: string,
  photo_id: T_ID,
  price: number,
  promo: number | null,
  special_group: T_Special_Group | null,
  size_value: number,
  size_unit: T_Size_Unit,
  color: string,
  count: string,
  min_order_value: number,
  min_order_unit: T_Min_Order_Unit
}

export type T_All_Items_Response = {
  items_count: number,
  pages: number,
  items: T_Item_Short[]
}

export type T_Item_Common = {
  id: T_ID,
  category_id: T_ID,
  category: string,
  name: string
}

export type T_Item_Variant = {
  photo_id: T_ID,
  price: number,
  promo: number | null,
  size_id: T_ID,
  size_value: number,
  size_unit: T_Size_Unit,
  color_id: T_ID,
  color: string,
  min_order_value: number,
  min_order_unit: T_Min_Order_Unit,
  description: string,
  special_group: T_Special_Group | null,
  available: number,
  photo_count: number
}

export type T_Item_Full = T_Item_Common & {
  variants: T_Item_Variant[]
}

export type T_Item_Response = {
  variants: number,
  item: T_Item_Full
}

export type T_Cart = { 
  [key: string]: { 
    item_id: string, 
    qty: number 
  } 
}

export type T_Cart_Props = { 
  item_id: string, 
  photo_id: string, 
  qty: number 
}