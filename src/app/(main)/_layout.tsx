import { withLayoutContext } from 'expo-router';

import { FontAwesome } from '@expo/vector-icons';
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
              <Pressable borderRadius={'$full'} p={'$1'} bgColor='#fff' ml='$4'>
                <FontAwesome name='arrow-down' size={20} color={'#000'} {...props} />
              </Pressable>
            );
          },
        }}
      />
    </JsStack>
  );
}
