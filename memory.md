# Project: venelin.ca

Personal portfolio site for Venelin Nikolov.

## Stack

- **Framework**: Next.js 16 (Pages Router, SSG with `getStaticProps`)
- **Language**: TypeScript 6
- **Styling**: Sass (SCSS modules) + PostCSS (Tailwind CSS 4 installed but largely unused)
- **Design Tokens**: style-dictionary 5 (`tokens/*.json` → `styles/` output via `tokens/config.js`)
- **Components**: Storybook 10 (`@storybook/nextjs-vite`)
- **CMS**: Contentful (headless, fetched at build time)
- **Images**: Cloudinary (optimized via `getOptimizedImage` in `utils/common.ts`)
- **Linting/Formatting**: Biome (`biome check --write`)
- **Deployment**: Netlify (`@netlify/plugin-nextjs`)
- **Package Manager**: pnpm

## Project Structure

- `pages/` — Next.js pages (Pages Router, dynamic `[[...slug]].tsx`)
- `components/` — React components with co-located `.module.scss` files. Below-the-fold sections are lazy-loaded via `next/dynamic`
- `tokens/` — Design token JSON files + `config.js` (style-dictionary v5 ESM config)
- `styles/` — Generated variables (`_css-variables.css`, `_base-variables.scss`, `variables.js`) + global SCSS
- `utils/` — Shared utilities (`content.ts` for Contentful, `common.ts`, `localization.js`, `fonts.js`)
- `.storybook/` — Storybook config (ESM, `main.js` + `preview.js`)
- `contentful/` — Standalone CJS scripts (`.cjs`) for import/export/migration

## Key Conventions

- **ESM**: Project uses `"type": "module"` in `package.json`. All `.js` config files use `export default`. Standalone CJS scripts in `contentful/` use `.cjs` extension.
- **Design Tokens**: Edit `tokens/*.json`, run `pnpm run build-dictionary` to regenerate. Token references use `{token.path}` syntax (not `{token.path.value}`).
- **Navigation**: Built from Contentful pages only (sorted by `order` field). No `customLinks` content type.
- **Localization**: Single locale (`en` / `en-US`). Config in `utils/localization.js`.
- **Images**: Use `getOptimizedImage()` for Cloudinary transforms. Next.js `<Image>` with `remotePatterns` for Cloudinary, Contentful, and YouTube.
- **Animations**: GSAP (with ScrollTrigger for parallax in Hero). `react-awesome-reveal` for section fade/zoom reveals (candidate for CSS replacement).

## Scripts

- `pnpm dev` — Dev server on port 3008
- `pnpm build` — Clean + build tokens + Next.js build + sitemap
- `pnpm storybook` — Storybook on port 6008
- `pnpm run build-dictionary` — Regenerate design tokens
- `pnpm run lint-format` — Biome check + auto-fix
