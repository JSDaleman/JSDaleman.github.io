import type I18nKeys from "../locales/keys";

interface Configuration {
  title: string;
  subTitle: string;
  brandTitle: string;

  pageTitle: string;
  description: string;

  site: string;

  locale: "en" | "es";

  themeColor: {
    hue: number
    fixed: boolean
  }

  navigators: { nameKey: I18nKeys; href: string }[];

  username: string;
  sign: string;
  avatarUrl: string;

  socialLinks: { icon: string; link: string }[];

  maxSidebarCategoryChip: number;
  maxSidebarTagChip: number;
  maxFooterCategoryChip: number;
  maxFooterTagChip: number;

  banners: string[];

  slugMode: "HASH" | "RAW";

  license: {
    name: string;
    url: string;
  };

  bannerStyle: "LOOP";
}

export type { Configuration };
