import { ThemeSwitch } from '@/components/ThemeSwitch';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, Text } from '@gluestack-ui/themed';
import { DrawerContentScrollView, DrawerItemList, DrawerView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Drawer
      screenOptions={{
        drawerPosition: 'right',
        headerLeft: (props) => undefined,
        headerRight: (props) => (
          <Center p={'$2'} mr={'$4'} mb={'$2'} bgColor='#333' borderRadius={'$full'}>
            <Pressable
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer);
              }}
            >
              <MaterialIcons name='menu-open' color={'#fff'} size={20} />
            </Pressable>
          </Center>
        ),
      }}
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
      <Drawer.Screen name='scroll-animation' options={{ headerShown: true, headerTitle: 'Scroll', title: 'SCROLL' }} />
      <Drawer.Screen
        name='scroll-animation_2'
        options={{ headerShown: true, headerTitle: 'Scroll2', title: 'SCROLL2' }}
      />
      <Drawer.Screen name='setting' options={{ headerShown: true, headerTitle: 'Settings', title: 'SETTINGS' }} />
    </Drawer>
  );
}
