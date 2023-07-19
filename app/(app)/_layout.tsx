import { FontAwesome } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, TabRouter, ThemeProvider } from '@react-navigation/native';
import { Navigator, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(main-stack)',
};

export default function TabsLayout() {
  const colorSchema = useColorScheme();

  return (
    <ThemeProvider value={colorSchema === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='(main-stack)' options={{ tabBarIcon: (props) => <FontAwesome name='home' {...props} /> }} />
        <Tabs.Screen name='two' options={{ tabBarIcon: (props) => <FontAwesome name='apple' {...props} /> }} />
        <Tabs.Screen name='three' options={{ tabBarIcon: (props) => <FontAwesome name='android' {...props} /> }} />
      </Tabs>
    </ThemeProvider>
  );
}
