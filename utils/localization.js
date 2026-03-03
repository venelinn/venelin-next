const localization = {
	contentfulLocales: ["en-US"],
	locales: ["en"],
	defaultLocale: "en",
	nonLocalizedModels: ["siteConfig"],
}

export const getContentfulLocale = (locale) =>
	localization.contentfulLocales[localization.locales.indexOf(locale)]

export const { contentfulLocales, locales, defaultLocale, nonLocalizedModels } =
	localization

export default localization
