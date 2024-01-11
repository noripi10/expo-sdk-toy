import { useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, Panel3 } from 'reanimated-color-picker';
import { Box, Button, ButtonText, Center, Divider, HStack, Heading } from '@gluestack-ui/themed';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  useBottomSheetSpringConfigs,
  BottomSheetHandleProps,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Skia, Canvas, Image as SkiaImage, useCanvasRef, SkImage } from '@shopify/react-native-skia';

import useNurieCanvas from '@/hooks/useNurieCanvas';
import Shape from '@/components/Shape';
import { hououImageBase64 } from '@/constants/image';
import { StatusBar } from 'expo-status-bar';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function NuriePage() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const canvasRef = useCanvasRef();

  const data = Skia.Data.fromBase64(hououImageBase64);
  const image = Skia.Image.MakeImageFromEncoded(data);

  const [nurieImage, setNurieImage] = useState<SkImage | null>(image);
  const [color, setColor] = useState('#000');
  const [strokeWidth, setStorokeWidth] = useState(4);

  // const [canvasLayout, setCanvasLayout] = useState<number>();
  const { shapes, currentShape, touchHandler, onClear } = useNurieCanvas({
    paintStyle: {
      strokeWidth: 4,
      color,
    },
    tool: 'pen',
  });

  return (
    <Box position='relative' bgColor='$white' flex={1} pt={top} pb={bottom}>
      <StatusBar style='dark' />
      <HStack px={'$4'} justifyContent='space-between'>
        <Button variant='link' onPress={() => router.replace('/(auth)/hero')}>
          <ButtonText>Go back</ButtonText>
        </Button>

        <HStack gap={'$6'}>
          <Button variant='link'>
            <ButtonText onPress={() => bottomSheetRef.current?.expand()}>Change</ButtonText>
          </Button>

          <Button variant='link' onPress={() => router.replace('/(auth)/hero')}>
            <ButtonText onPress={onClear}>Clear</ButtonText>
          </Button>

          <Button
            variant='link'
            onPress={() => {
              const snapshot = canvasRef.current?.makeImageSnapshot();
              // const base64 = snapshot?.encodeToBase64();
              // console.info({ base64 });
              if (snapshot) {
                setNurieImage(snapshot);
                onClear();
              }
            }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </HStack>
      </HStack>

      <Canvas
        ref={canvasRef}
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        onLayout={(p) => {
          // setCanvasHeight(p.nativeEvent.layout.height);
          // console.info(p.nativeEvent.layout);
        }}
        onTouch={touchHandler}
      >
        <SkiaImage image={nurieImage} fit='fitWidth' x={0} y={0} width={width} height={height} />

        {shapes.map((shape, index) => (
          <Shape key={index} {...shape} />
        ))}
        {currentShape && <Shape {...currentShape} />}
      </Canvas>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['18%', '50%', '90%']}
        handleIndicatorStyle={{ backgroundColor: '#000' }}
        backgroundStyle={{ backgroundColor: '#fdf2cd' }}
        enablePanDownToClose
        // enableDynamicSizing
        bottomInset={bottom}
      >
        <Box flex={1} bgColor='#fff'>
          <Box px={'$8'} py={'$5'}>
            <Heading color='#000'>Color Picker</Heading>
          </Box>
          <Box flex={1} alignItems='center'>
            <ColorPicker style={{ width: '80%' }} value={color} onComplete={(e) => setColor(e.rgba)}>
              <Preview />
              <Divider my='$4' bgColor='transparent' />
              <Panel1 />
              <Divider my='$4' bgColor='transparent' />
              {/* <HueSlider /> */}
              <OpacitySlider />
              <Divider my='$4' bgColor='transparent' />
              <Swatches
                colors={[
                  '#f44336',
                  '#E91E63',
                  '#9C27B0',
                  '#673AB7',
                  '#3F51B5',
                  '#2196F3',
                  '#03A9F4',
                  '#00BCD4',
                  '#009688',
                  '#4CAF50',
                  '#8BC34A',
                  '#CDDC39',
                  '#FFEB3B',
                  '#FFC107',
                  '#FF9800',
                  '#FF5722',
                  '#795548',
                  '#9E9E9E',
                  '#607D8B',
                  '#ddd',
                  '#000',
                ]}
              />
            </ColorPicker>
          </Box>

          <HStack justifyContent='flex-end' px={'$10'} pb={'$6'}>
            <Button variant='link' onPress={() => bottomSheetRef.current?.forceClose()}>
              <ButtonText>Close</ButtonText>
            </Button>
          </HStack>
        </Box>
      </BottomSheet>
    </Box>
  );
}

{
  /* <Line color={'#000'} strokeWidth={1} p1={} p2 /> */
}
{
  /* <Circle cx={100} cy={100} r={20} color='#338aeeed' /> */
}
{
  /* <Animated.View entering={FadeIn.delay(200)} style={[StyleSheet.absoluteFillObject, { flex: 1 }]}>
        <Image
          style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}
          alt='base64 image'
          source={{
            uri: `data:iamge/png;base64,${hououImageBase64}`,
          }}
          width={width}
          height={height}
          resizeMethod='resize'
          resizeMode='contain'
        />
      </Animated.View> */
}

{
  /* <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'100,100 140,100'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'80,120 160,120'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'120,120 100,180'} />

        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'180,100 240,100 180,180'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'210,140 230,180'} />

        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'280,100 280,180'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'280,140 300,140'} />
      </Svg> */
}
