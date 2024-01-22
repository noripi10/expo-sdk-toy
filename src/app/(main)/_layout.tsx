import { withLayoutContext } from 'expo-router';

import FontAwesome from '@expo/vector-icons/Ionicons';

import { ArrowDown } from 'lucide-react-native';

import { Pressable } from '@gluestack-ui/themed';
import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

const { Navigator } = createStackNavigator();

// TODO Expo Router が Native Stack で実装されているため Androidでmodalが動作しない
// https://github.com/expo/router/issues/640#issuecomment-1626767444
// https://docs.expo.dev/router/advanced/stack/#javascript-stack-with-react-navigationstack
export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

export default function MainLayout() {
  return (
    <JsStack>
      <JsStack.Screen name='(tab)' options={{ headerShown: false }} />
      <JsStack.Screen
        name='modal'
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: 'modal',
          headerShown: true,
          headerLeft: (props) => {
            return (
              <Pressable borderRadius={'$full'} w={'$2'} h={'$2'} rounded={'$full'} bgColor='#fff' ml='$4'>
                <ArrowDown size={20} color={'#000'} />
              </Pressable>
            );
          },
        }}
      />
    </JsStack>
  );
}
