export type ContentfulHero = {
  title: string;
  image?: any;
};

export type SocialType = {
  name: string;
  url?: string;
  icon?: string;
};

export type HeaderData = {
  title: string;
  description?: string;
  sectionTitle?: string;
  modules: ContentfulHero[];
};

export type Theme = "light" | "dark";

export type NavLink = {
  location?: string;
  slug: string;
  pageName: string;
  [key: string]: any;
};

export type PageType = {
  locale?: string;
  pageName?: string;
  metaData?: any;
  isLogoVisible?: boolean;
  isNavigationVisible?: boolean;
  [key: string]: any;
};

export type SiteConfig = {
  footer?: string | any;
  copyright?: string;
  fineprint?: string;
  theming?: boolean;
  social?: SocialType[];
  siteId?: string;
};
