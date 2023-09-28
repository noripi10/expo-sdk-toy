import { CustomThemeContext } from '@/context/Theme';
import { Icon, MoonIcon, SunIcon } from '@gluestack-ui/themed';
import { dist, makeImageFromView, vec } from '@shopify/react-native-skia';
import { useCallback, useContext } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

const wait = (time: number) => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), time));

export const ThemeSwitch = () => {
  const { customColorScheme, changeCustomScheme, ref, setOverlay1, setOverlay2, circle, transition } =
    useContext(CustomThemeContext);

  const toggleTheme = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = customColorScheme === 'dark' ? 'light' : 'dark';

      const r = Math.max(...corners.map((corner) => dist(corner, { x, y })));
      circle.value = { x, y, r };

      const overlay1 = await makeImageFromView(ref);

      setOverlay1(overlay1);
      setOverlay2(null);
      await wait(16);

      changeCustomScheme(newColorScheme);
      setOverlay1(overlay1);
      setOverlay2(null);
      await wait(16);

      const overlay2 = await makeImageFromView(ref);
      setOverlay1(overlay1);
      setOverlay2(overlay2);
      await wait(16);

      transition.value = 0;
      transition.value = withTiming(1, { duration: 640 });
      await wait(640);

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
