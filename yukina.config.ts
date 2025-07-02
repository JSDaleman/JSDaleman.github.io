import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Juan Sebastian Daleman",
  subTitle: "Blog and Portfolio",
  brandTitle: "JSDaleman",

  pageTitle: "Sebastian Daleman",
  description: "Blog and Portfolio of Juan Sebastian Daleman.",

  site: "https://www.sebastiandaleman.com",

  locale: "es", // set for website language and date format

  themeColor: {
    hue: 300,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_portafolio,
      href: "/portfolio",
    },
    {
      nameKey: I18nKeys.nav_bar_blog,
      href: "/blog",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/JSDaleman",
    },
  ],

  username: "JSDaleman",
  sign: "Mechatronics engineer student.",
  avatarUrl: "https://imgur.com/M960LJi.png",
  socialLinks: [ // Add icons https://icones.js.org/  or https://icon-sets.iconify.design/
    {
      icon: "line-md:github-loop",
      link: "https://github.com/JSDaleman",
    },
    {
      icon: "mynaui:brand-linkedin",
      link: "https://www.linkedin.com/in/juan-daleman-a89a9071/",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://imgur.com/0AX9Su4.jpg",
    "https://imgur.com/eLRXtUz.jpg",
    "https://imgur.com/8Fu0ZVK.jpg",
    "https://imgur.com/DMcdeam.jpg",
    "https://imgur.com/a5cy2AC.jpg",
    "https://imgur.com/hXf5v75.jpg",
    "https://imgur.com/FICilIW.jpg",
    "https://imgur.com/VFeyj5S.jpg",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
