export default {
	siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://venelin.ca",
	generateRobotsTxt: true,
	additionalPaths: async (config) => {
		return [
			{
				loc: "/",
				priority: 0.4,
				changefreq: "monthly",
			},
			{
				loc: "/about-us",
				priority: 1.0,
				changefreq: "monthly",
			},
			{
				loc: "/media",
				priority: 0.2,
				changefreq: "monthly",
			},
			{
				loc: "/events",
				priority: 1.0,
				changefreq: "monthly",
			},
			{
				loc: "/contacts",
				priority: 1.0,
				changefreq: "monthly",
			},
			{
				loc: "/media/hotarg",
				priority: 0.1,
				changefreq: "monthly",
			},
			{
				loc: "/media/videos",
				priority: 0.8,
				changefreq: "monthly",
			},
			{
				loc: "/media/barley-mow",
				priority: 0.8,
				changefreq: "monthly",
			},
		]
	},
}
