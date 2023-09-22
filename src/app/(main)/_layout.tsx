import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tab)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ headerShown: true, presentation: 'modal' }} />
    </Stack>
  );
}
