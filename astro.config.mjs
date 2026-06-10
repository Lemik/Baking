// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://baking.dushyn.com';
const base = '/';

export default defineConfig({
	site,
	base,
	output: 'static',
	trailingSlash: 'ignore',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr', 'uk', 'ru'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
		},
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					fr: 'fr',
					uk: 'uk',
					ru: 'ru',
				},
			},
		}),
	],
});
