import { FontAwesome } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, TabRouter, ThemeProvider } from '@react-navigation/native';
import { Navigator, Tabs } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(main-stack)',
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='(drawer)' options={{ tabBarIcon: (props) => <FontAwesome name='home' {...props} /> }} />
      <Tabs.Screen name='two' options={{ tabBarIcon: (props) => <FontAwesome name='apple' {...props} /> }} />
      <Tabs.Screen name='three' options={{ tabBarIcon: (props) => <FontAwesome name='android' {...props} /> }} />
    </Tabs>
  );
}
