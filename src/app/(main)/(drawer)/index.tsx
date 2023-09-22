import React from 'react';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Button, ButtonText, ButtonIcon, ButtonGroup, ButtonSpinner } from '@gluestack-ui/themed';
import { useWidth } from '@/hooks/useWidth';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Menu() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const flexibleWidth = useWidth();

  const animatedValue = useSharedValue(-32);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value }],
    };
  });

  return (
    <View style={[styles.continer, { paddingTop: top, width: flexibleWidth, margin: 'auto' }]}>
      <Link asChild href='/_sitemap' style={{ display: __DEV__ ? 'flex' : 'none' }}>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Go to SiteMap</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link asChild href='/face-detector'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Go to Face-Detector</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link asChild href='/modal'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Go to Modal</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <ButtonGroup
        onLayout={() => {
          animatedValue.value = withRepeat(withTiming(32, { duration: 1000 }), -1, true);
        }}
      >
        <Button bg='$teal500' w='$full' borderRadius={'$full'} onPress={() => router.replace('/(auth)/hero')}>
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

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 8,
    gap: 6,
  },
});
