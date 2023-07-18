import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: true }} />
        <Stack.Screen name='face-detector' options={{ headerShown: true }} />

        <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
