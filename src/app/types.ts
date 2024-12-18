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