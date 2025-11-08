import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import path, { dirname } from "path"
import webpack from "webpack"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
	stories: [
		"../components/**/*.mdx",
		"../components/**/*.stories.@(js|jsx|ts|tsx)",
	],

	addons: ["@storybook/addon-links", "@storybook/addon-docs"],

	framework: {
		name: "@storybook/nextjs",
		options: {
			nextConfigPath: path.resolve(__dirname, "../next.config.js"),
		},
	},

	docs: {},

	webpackFinal: async (storybookWebpackConfig) => {
		// ✅ Define environment variables for components
		storybookWebpackConfig.plugins.push(
			new webpack.DefinePlugin({
				"process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME": JSON.stringify(
					process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
				),
			}),
		)

		// ✅ Find and patch *nested* Sass rules
		storybookWebpackConfig.module.rules.forEach((rule) => {
			if (Array.isArray(rule.oneOf)) {
				rule.oneOf.forEach((one) => {
					one.use?.forEach((loader) => {
						if (loader.loader?.includes("sass-loader")) {
							loader.options = {
								...loader.options,
								sassOptions: {
									...(loader.options.sassOptions || {}),
									includePaths: [path.resolve(__dirname, "../")],
								},
							}
						}
					})
				})
			}
		})

		return storybookWebpackConfig
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
}

export default config
