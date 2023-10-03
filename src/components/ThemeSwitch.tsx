import { CustomThemeContext } from '@/context/Theme';
import { Icon, MoonIcon, SunIcon } from '@gluestack-ui/themed';
import { SkPoint, dist, makeImageFromView, vec } from '@shopify/react-native-skia';
import { useCallback, useContext } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
// SkPoints
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

const wait = (time: number) => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), time));

export const ThemeSwitch = () => {
  const { customColorScheme, changeCustomScheme, ref, setOverlay1, setOverlay2, circle, transition } =
    useContext(CustomThemeContext);

  const toggleTheme = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = customColorScheme === 'dark' ? 'light' : 'dark';

      // tap地点からの最大距離にあるコーナーを取得
      const tapPoint: SkPoint = { x, y };
      // Math.hypot
      const r = Math.max(...corners.map((corner) => dist(corner, tapPoint)));
      circle.value = { x, y, r };

      // 現在のSchemeをキャプチャして表示しておく
      const overlay1 = await makeImageFromView(ref);
      setOverlay1(overlay1);
      setOverlay2(null);
      await wait(16);

      // Scheme変更
      // 変更してもOverlay1があるので画面にはOverlay1(変更前Scheme)が表示されている
      changeCustomScheme(newColorScheme);

      // 再度現在のSchemeをキャプチャして表示しておく
      setOverlay1(overlay1);
      setOverlay2(null);
      await wait(16);

      // 変更後Schemeをキャプチャしてセット
      const overlay2 = await makeImageFromView(ref);
      setOverlay1(overlay1);
      setOverlay2(overlay2);
      await wait(16);

      // CircleサイズをPoint(tap位置)から大きくする
      // ImageShaderがあるのでCircle内はOverlay2が表示される
      transition.value = 0;
      transition.value = withTiming(1, { duration: 640 });
      await wait(640);

      // Overlay破棄
      setOverlay1(null);
      setOverlay2(null);
    },
    [customColorScheme]
  );

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      console.info('abolute path', e.absoluteX, e.absoluteY);
      toggleTheme(e.absoluteX, e.absoluteY);
    });

  return (
    <GestureDetector gesture={tap}>
      {customColorScheme === 'dark' ? (
        <Icon as={SunIcon} size='xl' color='#fff' />
      ) : (
        <Icon as={MoonIcon} size='xl' color='#fff' />
      )}
    </GestureDetector>
  );
};
