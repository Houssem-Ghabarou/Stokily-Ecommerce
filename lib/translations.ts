import { defaultLocale, type Locale } from './i18n';

const dictionaries = {
  fr: () => import('../messages/fr.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default),
  ar: () => import('../messages/ar.json').then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

