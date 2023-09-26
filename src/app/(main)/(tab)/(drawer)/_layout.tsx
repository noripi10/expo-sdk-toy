import { View } from '@/components/Themed';
import { CustomThemeContext } from '@/context/Theme';
import { Box, Icon, MoonIcon, SunIcon, Text } from '@gluestack-ui/themed';
import { DrawerContentScrollView, DrawerItemList, DrawerView } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useCallback, useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { customColorScheme, changeCustomScheme } = useContext(CustomThemeContext);
  const insets = useSafeAreaInsets();

  const toggleTheme = useCallback(() => {
    const newColorScheme = customColorScheme === 'dark' ? 'light' : 'dark';
    changeCustomScheme(newColorScheme);
  }, [customColorScheme]);

  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <>
            <Box
              pt={insets.top + 10}
              pb={'$6'}
              justifyContent='center'
              alignItems='center'
              bg={'$darkBlue400'}
              sx={{
                _dark: { bg: '$darkBlue900' },
              }}
            >
              <Text color='$white' fontWeight='$bold'>
                MENU
              </Text>
            </Box>

            <Box position='absolute' top={insets.top + 4} right={'$4'}>
              <TouchableOpacity onPress={toggleTheme}>
                {customColorScheme === 'dark' ? (
                  <Icon as={SunIcon} size='xl' color='#fff' />
                ) : (
                  <Icon as={MoonIcon} size='xl' color='#fff' />
                )}
              </TouchableOpacity>
            </Box>
            <DrawerContentScrollView {...props} style={{ flex: 1 }}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </>
        );
      }}
    >
      <Drawer.Screen name='index' options={{ headerTitle: 'Expo SDK Toy', title: 'HOME' }} />
      <Drawer.Screen
        name='face-detector'
        options={{ headerShown: true, headerTitle: 'Face Detector', title: 'FACE DETECTOR' }}
      />
      <Drawer.Screen name='setting' options={{ headerShown: true, headerTitle: 'Settings', title: 'SETTINGS' }} />
    </Drawer>
  );
}
