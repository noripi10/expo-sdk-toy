import { useCustomColorScheme } from '@/hooks/useCustomColorScheme';
import { Canvas, Circle, Image, ImageShader, SkImage, mix } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, createContext, useRef, useState } from 'react';
import { ColorSchemeName, Dimensions, StyleSheet, View } from 'react-native';
import { SharedValue, useDerivedValue, useSharedValue } from 'react-native-reanimated';

export type ContextProps = {
  customColorScheme: ColorSchemeName;
  changeCustomScheme: (newColorScheme: ColorSchemeName) => Promise<void>;
  ref: MutableRefObject<null>;
  setOverlay1: Dispatch<SetStateAction<SkImage | null>>;
  setOverlay2: Dispatch<SetStateAction<SkImage | null>>;
  circle: SharedValue<{ x: number; y: number; r: number }>;
  transition: SharedValue<number>;
};

export const CustomThemeContext = createContext<ContextProps>({} as ContextProps);

const { width, height } = Dimensions.get('screen');

export const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const { customColorScheme, changeCustomScheme } = useCustomColorScheme();

  const ref = useRef(null);

  const [overlay1, setOverlay1] = useState<SkImage | null>(null);
  const [overlay2, setOverlay2] = useState<SkImage | null>(null);

  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);

  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={customColorScheme === 'dark' ? 'light' : 'dark'} />
      <View ref={ref} style={{ flex: 1 }} collapsable={false}>
        <CustomThemeContext.Provider
          value={{ customColorScheme, changeCustomScheme, ref, setOverlay1, setOverlay2, circle, transition }}
        >
          {children}
        </CustomThemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents='none'>
        <Image image={overlay1} x={0} y={0} width={width} height={height} />
        {overlay2 && (
          <Circle c={circle} r={r}>
            <ImageShader image={overlay2} x={0} y={0} width={width} height={height} fit='cover' />
          </Circle>
        )}
      </Canvas>
    </View>
  );
};
