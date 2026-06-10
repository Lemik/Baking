import type { Locale, LocaleData, Recipe, SiteData, UiData, Product } from '../types';
import { defaultLocale, locales } from '../types';

const uiModules = import.meta.glob<{ default: UiData }>('../data/*/ui.json', { eager: true });
const siteModules = import.meta.glob<{ default: SiteData }>('../data/*/site.json', { eager: true });
const productModules = import.meta.glob<{ default: Product[] }>('../data/*/products.json', { eager: true });
const recipeModules = import.meta.glob<{ default: Recipe[] }>('../data/*/recipes.json', { eager: true });

export const siteUrl = 'https://baking.dushyn.com';

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function getLocaleData(lang: Locale): LocaleData {
	const ui = uiModules[`../data/${lang}/ui.json`]?.default;
	const site = siteModules[`../data/${lang}/site.json`]?.default;
	const products = productModules[`../data/${lang}/products.json`]?.default;
	const recipes = recipeModules[`../data/${lang}/recipes.json`]?.default;

	if (!ui || !site || !products || !recipes) {
		throw new Error(`Missing locale data for "${lang}"`);
	}

	return { ui, site, products, recipes };
}

export function localePath(lang: Locale, hash = ''): string {
	const path = `/${lang}/`;
	return hash ? `${path}${hash}` : path;
}

export function absoluteLocaleUrl(lang: Locale): string {
	return `${siteUrl}${localePath(lang)}`;
}

export function alternateLinks(currentLang: Locale): { lang: Locale | 'x-default'; href: string }[] {
	const links = locales.map((lang) => ({
		lang,
		href: absoluteLocaleUrl(lang),
	}));
	return [...links, { lang: 'x-default' as const, href: absoluteLocaleUrl(defaultLocale) }];
}

export function orderMailto(subject: string, body: string, email: string): string {
	const params = new URLSearchParams({ subject, body });
	return `mailto:${email}?${params.toString()}`;
}

export { defaultLocale, locales };
