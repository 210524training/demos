import * as ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

// Define a fallback if the user selects a language that we don't support
I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  es,
}

const currentLocale = I18n.currentLocale();

export const isRTL = currentLocale.indexOf('he') === 0;

ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name: string, params = {}): string {
  return I18n.t(name, params);
}