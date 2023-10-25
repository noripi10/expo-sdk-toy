import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIZE = 240;

export default function GesturePage() {
  const inset = useSafeAreaInsets();

  const gravity = useAnimatedSensor(SensorType.GRAVITY);
  const rotation = useAnimatedSensor(SensorType.ROTATION);

  const animatedStyle2 = useAnimatedStyle(() => {
    // const { x, y } = gravity.sensor.value;
    const { pitch, roll } = rotation.sensor.value;
    return {
      // transform: [{ translateX: withTiming(x * 20) }, { translateY: withTiming(y * 20) }],
      transform: [{ translateX: withTiming(-roll * 200) }, { translateY: withTiming(pitch * 200) }],
    };
  });

  // const animatedStyle3 = useAnimatedStyle(() => {
  //   // const { x, y } = gravity.sensor.value;
  //   // const { pitch, roll } = rotation.sensor.value;
  //   return {
  //     // transform: [{ translateX: withTiming(x * 20) }, { translateY: withTiming(y * 20) }],
  //     // transform: [{ translateX: withTiming(-roll * 50) }, { translateY: withTiming(pitch * 50) }],
  //   };
  // });

  return (
    <>
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, animatedStyle2]}
          source={require('@assets/images/sea.jpg')}
          resizeMode={'contain'}
        />
        {/* <Animated.View style={[styles.box, animatedStyle3]} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {},
  box: {
    height: SIZE,
    width: SIZE,
    // backgroundColor: '#448',
    borderRightColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 100,
    position: 'absolute',
  },
});
