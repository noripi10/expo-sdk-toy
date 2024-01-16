import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIZE = 120;

export default function GesturePage() {
  const { width, height } = useWindowDimensions();
  const inset = useSafeAreaInsets();
  // const tabHeight = useBottomTabBarHeight();
  // console.info({ width, height, inset });

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // clamp は移動可能なmin, maxを設定する
  // この閾値を超えたら位置を戻す(rubberBandEffect)
  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;
    })
    .onEnd((event) => {
      offsetX.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width / 2) + SIZE / 2, width / 2 - SIZE / 2],
      });
      offsetY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [-(height / 2) + inset.top + SIZE / 2, height / 2 - 80 / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  return (
    <>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>

      <Button
        style={{ position: 'absolute', top: inset.top + 16, left: 16 }}
        onPress={() => {
          offsetX.value = 0;
          offsetY.value = 0;
        }}
      >
        <ButtonText>Reset</ButtonText>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#4d69b0',
    borderRadius: 400,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
