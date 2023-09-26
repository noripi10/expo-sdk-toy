import { Drawer } from 'expo-router/drawer';

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen name='index' options={{ headerTitle: 'Expo SDK Toy' }} />
      <Drawer.Screen name='face-detector' options={{ headerShown: true, headerTitle: 'Face Detector' }} />
      <Drawer.Screen name='setting' options={{ headerShown: true, headerTitle: 'Settings' }} />
    </Drawer>
  );
}
