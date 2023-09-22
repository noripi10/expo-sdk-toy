import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen name='index' options={{ headerTitle: 'Expo SDK Toy' }} />
        <Drawer.Screen name='face-detector' options={{ headerShown: true, headerTitle: 'Face Detector' }} />
      </Drawer>
    </ThemeProvider>
  );
}
