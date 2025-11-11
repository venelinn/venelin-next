import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { componentMap } from "@/components";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { IS_DEV, normalizeSlug } from "@/utils/common";
import { getClient, getNavigationLinks, getPagePaths, getPages, getSiteConfig } from "../utils/content";
import localization from "../utils/localization";

// --- Types ---
type SectionProps = {
  id: string;
  type: string;
  [key: string]: any; // allow other properties
};

type PageType = {
  slug: string;
  locale: string;
  pageName?: string;
  sections?: SectionProps[];
};

type SiteConfig = any; // define your structure if you have one
type NavigationLink = any; // define your structure if you have one

type Props = {
  page: PageType;
  siteConfig: SiteConfig;
  navigationLinks: NavigationLink[];
};

// --- Page Component ---
const ComposablePage: NextPage<Props> = ({ page, siteConfig, navigationLinks }) => {
  return (
    <Layout page={page} siteConfig={siteConfig} navigationLinks={navigationLinks}>
      {page.sections?.length ? (
        page.sections.map((section: any) => {
          // 🛑 Skip unwanted sections by ID or type
          const Component = componentMap[section.type];
          if (!Component) return null;

          if (section.type === "intro") {
            return (
              <Component
                key={section.id}
                social={siteConfig?.social}
                pageName={page?.pageName}
                size={section.size}
                {...section}
              />
            );
          }
          return (
            <Section
              key={section.id}
              type={section.type}
              heading={section.heading}
              description={section.description}
              className={section.slug}
              size={section?.size?.contentSize}
            >
              <Component {...section} pageName={page?.pageName} />
            </Section>
          );
        })
      ) : (
        <EmptyState />
      )}
    </Layout>
  );
};

// --- Empty state ---
function EmptyState() {
  return IS_DEV ? (
    <div className="flex items-center justify-center w-full py-32">
      <div className="border-4 border-gray-400 rounded p-16 border-dashed flex flex-col gap-2 items-center">
        <span className="text-2xl">Empty page! add sections.</span>
        <span>(this message does not appear in production)</span>
      </div>
    </div>
  ) : null;
}

// --- getStaticPaths ---
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const cdaClient = getClient(false);
  const routesPromises = locales?.map(async (locale) => await getPagePaths(cdaClient, locale)) || []; // 💡 Pass Client
  const pathsArray = await Promise.all(routesPromises);
  const paths = pathsArray.flatMap((p) => p);

  return { paths, fallback: false };
};

// --- getStaticProps ---
export const getStaticProps: GetStaticProps = async ({ params, locale, preview }) => {
  // 💡 Include 'preview' in destructuring
  const slugArray = params?.slug ?? [];
  const slug = "/" + slugArray.filter(Boolean).join("/");

  const pageLocale = locale || localization.defaultLocale;

  // 1. Determine if we are in Preview Mode
  const isPreview = preview || false;

  // 2. Initialize the correct Contentful client
  const client = getClient(isPreview); // 💡 CRUCIAL: Gets the CPA client if preview is true

  // 3. Pass the client object to all fetching functions
  const [siteConfig, allPages] = await Promise.all([
    getSiteConfig(client, pageLocale), // 💡 Pass Client
    getPages(client, pageLocale), // 💡 Pass Client
  ]);

  const page = allPages.find((e) => normalizeSlug(e.slug) === slug && e.locale === pageLocale);

  if (!page) {
    console.warn("Did not find page for:", params, "locale:", locale);
    return { notFound: true, revalidate: 1 }; // Add revalidate for safety
  }

  const navigationLinks = await getNavigationLinks(client, allPages, pageLocale); // 💡 Pass Client

  return {
    props: {
      page,
      siteConfig,
      navigationLinks,
      preview: isPreview, // Optional: Pass back to the component
    },
    // CRUCIAL: Use the client to bypass SSG only when in preview mode
    revalidate: isPreview ? 1 : 60,
  };
};
export default ComposablePage;
