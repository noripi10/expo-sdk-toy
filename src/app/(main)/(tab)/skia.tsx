// import { Box, Center, Heading } from '@gluestack-ui/themed';
// import {
//   Canvas,
//   Circle,
//   Group,
//   Mask,
//   Rect,
//   useSharedValueEffect,
//   useSpring,
//   useValue,
// } from '@shopify/react-native-skia';
// import { useEffect } from 'react';
// import { Dimensions } from 'react-native';
// import {
//   useDerivedValue,
//   useSharedValue,
//   withRepeat,
//   withSequence,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

// export default function TabThreeScreen() {
//   const { top } = useSafeAreaInsets();

//   const val = useValue(0);
//   const anim = useSharedValue(0);
//   // const x = useSpring(anim.value + width / 2);

//   useSharedValueEffect(() => {
//     val.current = anim.value + width / 2;
//   }, anim);

//   useEffect(() => {
//     anim.value = withRepeat(
//       withSequence(withSpring(100, { duration: 1000 }), withSpring(-100, { duration: 1000 })),
//       -1,
//       true
//     );
//   }, []);

//   return (
//     <Box flex={1} pt={top}>
//       <Heading>SKIA</Heading>
//       <Canvas style={{ flex: 1 }}>
//         <Rect
//           transform={[{ translateX: -width / 4 }, { translateY: -height / 4 }]}
//           x={val}
//           y={height / 2}
//           width={width / 2}
//           height={width / 2}
//           color='lightblue'
//         />
//       </Canvas>
//     </Box>
//   );
// }

import { useWindowDimensions } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withDecay } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
export default function AnimationWithTouchHandler() {
  const { width, height } = useWindowDimensions();
  const tabHeight = useBottomTabBarHeight();

  const { top } = useSafeAreaInsets();
  const leftBoundary = 0;
  const rightBoundary = width;
  const translateX = useSharedValue(width / 2);
  const translateY = useSharedValue(top);
  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        rubberBandEffect: true,
        clamp: [leftBoundary + 20, rightBoundary - 20],
      });
      translateY.value = withDecay({
        velocity: e.velocityY,
        rubberBandEffect: true,
        clamp: [top, height - tabHeight - 20],
      });
    });
  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ flex: 1 }}>
        {/* <Fill color='white' /> */}
        <Circle cx={translateX} cy={translateY} r={20} color='#338aeeed' />
      </Canvas>
    </GestureDetector>
  );
}
