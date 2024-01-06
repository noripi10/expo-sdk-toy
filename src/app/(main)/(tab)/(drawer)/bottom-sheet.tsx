import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Center,
  Pressable,
  Text,
  useColorMode,
  Image,
  Heading,
} from '@gluestack-ui/themed';

import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  useBottomSheetSpringConfigs,
  BottomSheetHandleProps,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { memo, useMemo, useRef, useState } from 'react';

import { faker } from '@faker-js/faker';
import { ScaledSize, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const createMockData = (count = 20) => {
  return new Array(count).fill(0).map(() => ({
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    sex: faker.person.sex(),
    image: faker.image.url(),
  }));
};

type BottomListItemProps<T> = {
  item: T;
  index: number;
  dimentions: ScaledSize;
  onPress?: () => void;
};
const BottomListItem = memo(
  <T extends Record<string, any>>({ item, index, dimentions, onPress }: BottomListItemProps<T>) => {
    const WrapperContainer = useMemo(() => (onPress ? Pressable : Box), [onPress]);

    return (
      <WrapperContainer
        position='relative'
        bgColor={`${faker.color.rgb()}`}
        flex={1}
        onPress={onPress}
        width={200}
        height={160}
      >
        <Box flex={1} style={StyleSheet.absoluteFillObject}>
          <Image
            alt={item.name}
            style={{ flex: 1, width: '100%', aspectRatio: 16 / 9, opacity: 0.7 }}
            source={{ uri: item.image }}
            resizeMode='cover'
          />
        </Box>
        <Box flex={1} p='$0' m='$0' justifyContent='flex-end'>
          <Text color='#fff'>{index}</Text>
          {Object.entries(item).map(([key, value]) => (
            <Box key={key}>
              <Text color='#fff'>
                {key}: {value}
              </Text>
            </Box>
          ))}
        </Box>
      </WrapperContainer>
    );
  }
);

const ButtomSheetBackDrop = memo((props: BottomSheetBackdropProps) => {
  return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} pressBehavior={'close'} />;
});

const BottomSheetHandle = memo(({ animatedIndex }: BottomSheetHandleProps) => {
  const handleLeftAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animatedIndex.value, [0, 1], [-30, 30], Extrapolate.CLAMP);
    const translateX = interpolate(animatedIndex.value, [0, 1], [2, 2]);
    return {
      transform: [{ rotate: `${rotate}deg` }, { translateX }],
    };
  }, []);

  const handleRightAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animatedIndex.value, [0, 1], [30, -30], Extrapolate.CLAMP);
    const translateX = interpolate(animatedIndex.value, [0, 1], [-2, -2]);

    return {
      transform: [{ rotate: `${rotate}deg` }, { translateX }],
    };
  }, []);

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 14, flexDirection: 'row' }}
    >
      <Animated.View
        style={[
          {
            width: 10,
            height: 4,
            backgroundColor: '#fff',
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          },
          handleLeftAnimatedStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 10,
            height: 4,
            backgroundColor: '#fff',
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          },
          handleRightAnimatedStyle,
        ]}
      />
    </Animated.View>
  );
});

export default function BottomSheetPage() {
  const dimentions = useWindowDimensions();
  const colorMode = useColorMode();
  const data = useMemo(() => createMockData(), []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  //#region state
  const [enableContentPanningGesture, setEnableContentPanningGesture] = useState(true);
  const [enableHandlePanningGesture, setEnableHandlePanningGesture] = useState(true);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(-1);
  //#endregion

  // #region variables
  const snapPoints = useMemo(() => ['25%', '45%'], []);
  const enableContentPanningGestureButtonText = useMemo(
    () => (enableContentPanningGesture ? 'Disable Content Panning Gesture' : 'Enable Content Panning Gesture'),
    [enableContentPanningGesture]
  );
  const enableHandlePanningGestureButtonText = useMemo(
    () => (enableHandlePanningGesture ? 'Disable Handle Panning Gesture' : 'Enable Handle Panning Gesture'),
    [enableHandlePanningGesture]
  );
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  //#endregion

  const renderFlatListItem = ({ item, index }: { item: (typeof data)[0]; index: number }) => (
    <BottomListItem {...{ item, index, dimentions }} />
  );

  const customAnimatedIndex = useSharedValue(-1);
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(customAnimatedIndex.value, [-1, 0, 1], ['transparent', '#a8b5eb', '#a8cfff']),
    };
  }, []);

  // useDerivedValue(() => {
  //   console.info(animatedIndex.value);
  // });

  return (
    <Animated.View style={[{ flex: 1 }, containerAnimatedStyle]}>
      <Center gap={'$2'}>
        <ButtonGroup flexWrap='wrap' justifyContent='center' alignItems='center'>
          {snapPoints.map((point, index) => (
            <Button key={point} onPress={() => bottomSheetRef.current?.snapToIndex(index)}>
              <ButtonText>{point}</ButtonText>
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup>
          <Button onPress={() => bottomSheetRef.current?.expand()}>
            <ButtonText>Expand</ButtonText>
          </Button>
          <Button onPress={() => bottomSheetRef.current?.collapse()}>
            <ButtonText>Collapse</ButtonText>
          </Button>
          <Button onPress={() => bottomSheetRef.current?.close()}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ButtonGroup>

        <ButtonGroup flexWrap='wrap' alignItems='center' justifyContent='center'>
          <Button action='positive' onPress={() => setEnableContentPanningGesture((pre) => !pre)}>
            <ButtonText>{enableContentPanningGestureButtonText}</ButtonText>
          </Button>
          <Button action='positive' onPress={() => setEnableHandlePanningGesture((pre) => !pre)}>
            <ButtonText>{enableHandlePanningGestureButtonText}</ButtonText>
          </Button>
        </ButtonGroup>
      </Center>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount={true}
        enableOverDrag={false}
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
        onAnimate={(from, to) => {
          // onChangeよりも先に発火
          customAnimatedIndex.value = withTiming(to);
        }}
        onChange={(snapPoint) => {
          setCurrentSnapPoint(snapPoint);
        }}
        index={currentSnapPoint}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{
          backgroundColor: colorMode === 'dark' ? '#222' : '#fff',
        }}
        // backdropComponent={(props) => <ButtomSheetBackDrop {...props} />}
        handleComponent={(props) => <BottomSheetHandle {...props} />}
        // style={
        //   {
        //     shadowColor: '#000',
        //     shadowOffset: { width: 4, height: 4 },
        //     shadowOpacity: 0.8,
        //     shadowRadius: 10,
        //   }
        // }
      >
        <Heading px={8}>Horizontal FlatList</Heading>
        <FlatList
          data={data}
          refreshing={false}
          onRefresh={undefined}
          keyExtractor={(item, index) => `${item.name}.${index}`}
          initialNumToRender={3}
          bounces={true}
          windowSize={16}
          maxToRenderPerBatch={5}
          renderItem={renderFlatListItem}
          style={{
            // overflow: 'visible',
            flex: 1,
            marginHorizontal: 6,
          }}
          keyboardDismissMode='interactive'
          indicatorStyle='black'
          contentContainerStyle={{ gap: 6, overflow: 'visible' }}
          // focusHook={useFocusEffect}
          horizontal
          pagingEnabled
          scrollEnabled={snapPoints.length - 1 === currentSnapPoint}
        />
        <ButtonGroup p={'$4'} justifyContent='space-evenly'>
          <Button flex={1}>
            <ButtonText>Favarite</ButtonText>
          </Button>
          <Button flex={1} action='negative'>
            <ButtonText>Go to Site</ButtonText>
          </Button>
          <Button flex={1} action='positive'>
            <ButtonText>Route</ButtonText>
          </Button>
        </ButtonGroup>
      </BottomSheet>
    </Animated.View>
  );
}
