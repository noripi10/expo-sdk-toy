import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCustomColorScheme = () => {
  const [customColorScheme, setCustomColorScheme] = useState<ColorSchemeName>();
  const nativeColorScheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('@color-scheme').then((result) => {
      if (result) {
        setCustomColorScheme((result ?? nativeColorScheme ?? 'light') as ColorSchemeName);
      }
    });
  }, []);

  const changeCustomScheme = (newColorScheme: ColorSchemeName) => {
    AsyncStorage.setItem('@color-scheme', newColorScheme ?? '');
    setCustomColorScheme(newColorScheme);
  };

  return { nativeColorScheme, customColorScheme, changeCustomScheme };
};
