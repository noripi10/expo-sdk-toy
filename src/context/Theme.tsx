import { useCustomColorScheme } from '@/hooks/useCustomColorScheme';
import { PropsWithChildren, createContext } from 'react';
import { ColorSchemeName } from 'react-native';

export type ContextProps = {
  customColorScheme: ColorSchemeName;
  changeCustomScheme: (newColorScheme: ColorSchemeName) => Promise<void>;
};

export const CustomThemeContext = createContext<ContextProps>({} as ContextProps);

export const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const { customColorScheme, changeCustomScheme } = useCustomColorScheme();

  return (
    <CustomThemeContext.Provider value={{ customColorScheme, changeCustomScheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};
