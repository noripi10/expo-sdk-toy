import { Box, Center, Heading } from '@gluestack-ui/themed';
import { Canvas, Circle } from '@shopify/react-native-skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabThreeScreen() {
  const { top } = useSafeAreaInsets();
  const r = 256 * 0.33;
  return (
    <Box flex={1} pt={top}>
      <Heading>SKIA</Heading>
      <Canvas style={{ flex: 1 }}>
        <Circle cx={r} cy={r} r={r} color='#dd9' />
      </Canvas>
    </Box>
  );
}
