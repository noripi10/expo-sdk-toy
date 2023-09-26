import { Center, Heading } from '@gluestack-ui/themed';
import { Canvas, Circle } from '@shopify/react-native-skia';

export default function TabThreeScreen() {
  const r = 256 * 0.33;
  return (
    <Center flex={1}>
      <Heading>SKIA</Heading>
      <Canvas style={{ flex: 1 }}>
        <Circle cx={r} cy={r} r={r} color='cyan' />
      </Canvas>
    </Center>
  );
}
