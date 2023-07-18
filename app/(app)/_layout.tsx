import { Tabs } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='(main-stack)' />
      <Tabs.Screen name='two' />
      <Tabs.Screen name='three' />
    </Tabs>
  );
}
