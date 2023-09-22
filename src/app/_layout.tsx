import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import * as Notifications from 'expo-notifications';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// ★ SetUp Task Manager ★
import '@/libs/task';
import { ProtectedProvider } from '@/context/Protected';

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

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GluestackUIProvider config={config.theme} colorMode={colorScheme === 'dark' ? 'dark' : 'light'}>
        <ProtectedProvider>
          <Slot />
        </ProtectedProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
