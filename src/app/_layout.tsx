import { PropsWithChildren, useContext, useEffect } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Slot, SplashScreen, useRouter } from 'expo-router';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

import { ProtectedProvider } from '@/context/Protected';

import { UpdateView } from '@/components/UpdateView';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { CustomThemeContext, CustomThemeProvider } from '@/context/Theme';

import { Sound } from '@/components/Sound';
// ★ SetUp Task Manager ★
import '@/libs/task';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(main)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const router = useRouter();
  const { customColorScheme } = useContext(CustomThemeContext);

  const [loaded, error] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && customColorScheme) {
      setTimeout(() => {
        // ちょっと遅らせないとindex.tsxが表示されてしまう
        // -> useEffectでユーザー認証を感知しているから
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loaded, customColorScheme]);

  useEffect(() => {
    let isMounted = true;

    const notifyReceiveHandler = (notification: Notifications.Notification) => {
      console.info('【notifyReceiveHandler】', notification);
      if (notification.request.content.data.url) {
        router.push(notification.request.content.data.url);
      }
    };

    const notifyResponseHandler = (response: Notifications.NotificationResponse) => {
      console.info('【notifyResponseHandler】', response);
    };

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) return;
      notifyReceiveHandler(response.notification);
    });

    const subscribe = Notifications.addNotificationReceivedListener(notifyReceiveHandler);
    const subscribe2 = Notifications.addNotificationResponseReceivedListener(notifyResponseHandler);

    return () => {
      isMounted = false;
      subscribe.remove();
      subscribe2.remove();
    };
  }, [router]);

  if (!loaded || !customColorScheme) {
    return null;
  }

  return (
    <NavigationThemeProvider value={customColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GluestackUIProvider config={config} colorMode={customColorScheme === 'dark' ? 'dark' : 'light'}>
        <ProtectedProvider>
          <KeyboardProvider
          // statusBarTranslucent
          // navigationBarTranslucent
          >
            <UpdateView />
            <Slot />
          </KeyboardProvider>
        </ProtectedProvider>
      </GluestackUIProvider>
    </NavigationThemeProvider>
  );
}

export default function CustomThemeWrapper() {
  return (
    <CustomThemeProvider>
      <RootLayout />
    </CustomThemeProvider>
  );
}
