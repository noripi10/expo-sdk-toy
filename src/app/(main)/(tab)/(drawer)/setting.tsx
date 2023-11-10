import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonGroup,
  ButtonSpinner,
  Heading,
  Switch,
  Center,
  Box,
  Text,
} from '@gluestack-ui/themed';
import { View } from '@/components/Themed';
import { useAuth } from '@/context/Protected';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { useCallback, useEffect, useMemo } from 'react';

export default function Settings() {
  const { setting, globalSetting } = useUpdateSettings();

  const router = useRouter();

  const { setUser } = useAuth();

  const animatedValue = useSharedValue(-32);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value }],
    };
  });

  const memoComponent = useCallback(() => {
    return (
      <Box>
        <Text>Memo Component</Text>
      </Box>
    );
  }, []);

  useEffect(() => {
    animatedValue.value = withRepeat(withTiming(32, { duration: 1000 }), -1, true);

    return () => {
      cancelAnimation(animatedValue);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 8 }}>
      <Heading fontSize={'$2xl'} p={'$4'}>
        Setting Screen
      </Heading>

      <Center p={'$4'}>
        <Switch
          value={setting}
          onToggle={(args) => {
            globalSetting(args);
          }}
        />
      </Center>

      <ButtonGroup>
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

      <Center flex={1}>{memoComponent()}</Center>
    </View>
  );
}
