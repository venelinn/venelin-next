import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import path, { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
	stories: [
		"../components/**/*.mdx",
		"../components/**/*.stories.@(js|jsx|ts|tsx)",
	],

	addons: ["@storybook/addon-links", "@storybook/addon-docs"],

	framework: {
		name: "@storybook/nextjs-vite",
		options: {
			nextConfigPath: path.resolve(__dirname, "../next.config.js"),
		},
	},

	docs: {},

	env: {
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
			process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
}

export default config
