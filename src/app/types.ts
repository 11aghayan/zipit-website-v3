export type T_ID = string;
export type T_Children = Readonly<{
  children: React.ReactNode;
}>;
export type T_Lang = "am" | "ru";

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
  }
}

export type T_Category = {
  id: T_ID,
  label: string,
  item_count: string
};

export type T_All_Categories_Response = {
  length: number,
  categories: T_Category[]
}