import 'server-only';

const dictionaries = {
  ar: () => import('./ar.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.ar();
};
