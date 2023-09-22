import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { Button, ButtonText, ButtonIcon, ButtonGroup, ButtonSpinner } from '@gluestack-ui/themed';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/Protected';

export default function Settings() {
  const router = useRouter();

  const { setUser } = useAuth();

  const animatedValue = useSharedValue(-32);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value }],
    };
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Setting Screen</Text>

      <ButtonGroup
        onLayout={() => {
          animatedValue.value = withRepeat(withTiming(32, { duration: 1000 }), -1, true);
        }}
      >
        <Button
          bg='$teal500'
          w='$full'
          borderRadius={'$full'}
          onPress={() => {
            setUser(undefined);
            router.replace('/(auth)/hero');
          }}
        >
          {/* <Button.Spinner /> */}
          <Animated.View style={[{ flexDirection: 'row' }, animatedStyle]}>
            <ButtonIcon as={() => <FontAwesome name='sign-out' size={24} color={'#fff'} />} />
            <ButtonText>Logout</ButtonText>
            <ButtonIcon as={() => <FontAwesome name='sign-out' size={24} color={'#fff'} />} />
          </Animated.View>
        </Button>
      </ButtonGroup>
    </View>
  );
}
