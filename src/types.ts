export const locales = ['en', 'fr', 'uk', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
	en: 'English',
	fr: 'Français',
	uk: 'Українська',
	ru: 'Русский',
};

export interface UiData {
	nav: { products: string; recipes: string; order: string };
	sections: {
		products: string;
		productsSubtitle: string;
		recipes: string;
		recipesSubtitle: string;
		order: string;
		orderSubtitle: string;
	};
	productCategories: { bread: string; cookie: string };
	includedLabel: string;
	ingredientsLabel: string;
	pricingNote: string;
	orderButton: string;
	orderEmail: string;
	orderBody: string;
	ctaPrimary: string;
	ctaOrder: string;
	footer: { tagline: string; delivery: string; pickup: string };
	orderFulfillmentLine: string;
	langNames: Record<Locale, string>;
	langShort: Record<Locale, string>;
}

export interface SiteData {
	title: string;
	description: string;
	brand: string;
	hero: { headline: string; subheadline: string; badge: string };
	about: { title: string; paragraphs: string[] };
	fulfillment: {
		title: string;
		subtitle: string;
		delivery: { title: string; description: string };
		pickup: { title: string; description: string };
	};
}

export interface Product {
	id: string;
	name: string;
	category: 'bread' | 'cookie';
	tagline: string;
	included: string[];
	image: string;
	orderSubject: string;
}

export interface RecipeIngredient {
	name: string;
	origin: { label: string; detail: string; icon: string };
}

export interface Recipe {
	productId: string;
	ingredients: RecipeIngredient[];
}

export interface LocaleData {
	ui: UiData;
	site: SiteData;
	products: Product[];
	recipes: Recipe[];
}
