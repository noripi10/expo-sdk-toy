import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCustomColorScheme = () => {
  const [customColorScheme, setCustomColorScheme] = useState<ColorSchemeName>();
  const nativeColorScheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('@color-scheme').then((result) => {
      console.info({ result });
      if (result) {
        setCustomColorScheme((result ?? nativeColorScheme ?? 'light') as ColorSchemeName);
      } else {
        setCustomColorScheme('dark');
      }
    });
  }, []);

  const changeCustomScheme = async (newColorScheme: ColorSchemeName) => {
    try {
      setCustomColorScheme(newColorScheme);
      await AsyncStorage.setItem('@color-scheme', newColorScheme ?? '');
    } catch (error) {
      console.error('useCustomColorScheme', error);
    }
  };

  return { customColorScheme, changeCustomScheme };
};
