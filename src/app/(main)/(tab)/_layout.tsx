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
      <Tabs.Screen
        name='keyboard-provider'
        options={{ tabBarIcon: (props) => <FontAwesome name='keyboard-o' {...props} /> }}
      />
      <Tabs.Screen name='skia' options={{ tabBarIcon: (props) => <FontAwesome name='500px' {...props} /> }} />
      <Tabs.Screen name='gesture' options={{ tabBarIcon: (props) => <FontAwesome name='hand-grab-o' {...props} /> }} />
    </Tabs>
  );
}
