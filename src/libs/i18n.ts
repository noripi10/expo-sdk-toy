import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { TranslateOptions } from 'i18n-js/typings/typing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const i18n = new I18n({
  en: { welcome: 'Hello' },
  ja: { welcome: 'ハロー' },
});

export const t = (scope: string, options?: TranslateOptions) => {
  return i18n.t(scope, options);
};

export const setLocale = async () => {
  try {
    const locales = getLocales();
    const firstLocale = locales[0].languageCode;
    const storageLocele = await AsyncStorage.getItem('locale');
    const targetLocale = storageLocele ?? firstLocale;

    i18n.locale = targetLocale;
    i18n.enableFallback = true;
  } catch (err) {
    console.warn(err);
    i18n.locale = 'ja';
    i18n.enableFallback = true;
  }
};
setLocale();
