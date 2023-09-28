import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Box, Text } from '@gluestack-ui/themed';
import { DrawerContentScrollView, DrawerItemList, DrawerView } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const insets = useSafeAreaInsets();

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
              <ThemeSwitch />
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
