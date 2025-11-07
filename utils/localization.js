const localization = {
	contentfulLocales: ["en-US"],
	locales: ["en"],
	defaultLocale: "en",
	nonLocalizedModels: ["siteConfig"],
}

module.exports = {
	...localization,
	getContentfulLocale: (locale) =>
		localization.contentfulLocales[localization.locales.indexOf(locale)],
}
