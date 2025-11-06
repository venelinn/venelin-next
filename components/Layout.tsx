import Head from "next/head";
import { Footer } from "@/components/Footer";
import { type NavLink, type PageType, type SiteConfig, Theme } from "@/types/types";
import MetaData from "./MetaData";

interface LayoutProps {
  page: PageType;
  siteConfig?: SiteConfig;
  navigationLinks: NavLink[];
  children?: React.ReactNode;
}

export const Layout = ({ children, navigationLinks = [], siteConfig, page }: LayoutProps) => {
  const seo = page?.metaData;
  const footer = siteConfig?.footer;
  // const allLinks = navigationLinks;
  const footerNavLinks = navigationLinks.filter((link) => link.location === "footer");
  const footerLinks = footerNavLinks;

  return (
    <>
      <Head>
        <title>{seo?.pageTitle || page.pageName}</title>
      </Head>
      <MetaData title={seo?.pageTitle} description={seo?.pageDescription} keywords={seo?.keywords} />
      {children}
      <Footer siteConfig={footer} links={footerLinks || []} />
    </>
  );
};
