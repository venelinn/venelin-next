/** @type { import('@storybook/nextjs').Preview } */
import "../styles/style.scss"
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
}

export default preview
