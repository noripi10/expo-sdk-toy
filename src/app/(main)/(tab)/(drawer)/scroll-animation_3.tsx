import { faker } from '@faker-js/faker';
import { Button, ButtonText, Center, HStack, Image } from '@gluestack-ui/themed';
import { Box, Text } from '@gluestack-ui/themed';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DATA = [...Array(5).keys()].map(() => ({
  avatar: faker.image.avatar(),
  name: faker.person.fullName(),
  job: faker.person.jobTitle(),
}));

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView>(null);

  const [activeIndex, setAcitveIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (step: number, force = false) => {
    const nextIndex = force ? step : activeIndex + step;
    setAcitveIndex(nextIndex);
    scrollX.value = nextIndex * SCREEN_WIDTH;

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
    }, 200);
  };

  const enableBack = useMemo(() => activeIndex > 0, [activeIndex]);
  const enableNext = useMemo(() => activeIndex < DATA.length - 1, [activeIndex]);

  return (
    <Box flex={1} alignItems='center'>
      <Animated.ScrollView ref={scrollRef} horizontal pagingEnabled scrollEnabled={false} style={styles.scrollView}>
        {DATA.map((item, index) => (
          <ExplainItem key={item.name} item={item} index={index} scrollX={scrollX} />
        ))}
      </Animated.ScrollView>
      <HStack p={'$10'} width={'$full'} justifyContent='space-between' px={'$4'}>
        <Button onPress={() => handleScroll(-1)} isDisabled={!enableBack} $disabled-bg='$darkBlue600'>
          <ButtonText>Back</ButtonText>
        </Button>
        <Button onPress={() => handleScroll(1)} isDisabled={!enableNext} $disabled-bg='$darkBlue600'>
          <ButtonText>Next</ButtonText>
        </Button>
      </HStack>
      <HStack position='absolute' top={0} left={0} right={0} justifyContent='space-between' px={'$4'}>
        <Button onPress={() => handleScroll(0, true)} variant='link'>
          <ButtonText>Re</ButtonText>
        </Button>

        <Button onPress={() => handleScroll(DATA.length - 1, true)} variant='link'>
          <ButtonText>Skip</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

const ExplainItem = ({
  item,
  index,
  scrollX,
}: { item: (typeof DATA)[0]; index: number; scrollX: SharedValue<number> }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(
            interpolate(
              scrollX.value,
              [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
              // pagenation時の増減分を吸収するから逆にする
              [SCREEN_WIDTH, 0, -1 * SCREEN_WIDTH],
              Extrapolate.CLAMP
            ),
            {
              damping: 11,
            }
          ),
        },
      ],
    };
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withDelay(
            100,
            withSpring(
              interpolate(
                scrollX.value,
                [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                [SCREEN_WIDTH, 0, -1 * SCREEN_WIDTH],
                Extrapolate.CLAMP
              ),
              {
                damping: 13,
              }
            )
          ),
        },
      ],
    };
  });

  const animatedDescriptionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withDelay(
            300,
            withSpring(
              interpolate(
                scrollX.value,
                [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                [SCREEN_WIDTH, 0, -1 * SCREEN_WIDTH],
                Extrapolate.CLAMP
              ),
              {
                damping: 15,
              }
            )
          ),
        },
      ],
    };
  });

  const animatedValue = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedValue.value,
      height: animatedValue.value,
    };
  });

  return (
    <Center flex={1} width={SCREEN_WIDTH} gap={10}>
      <AnimatedImage
        style={[styles.avatar, animatedImageStyle]}
        source={{ uri: item.avatar }}
        alt={item.name}
        resizeMode={'contain'}
      />
      <AnimatedText style={[animatedHeaderStyle]} p={'$1.5'} fontSize={'$2xl'}>
        {item.name}
      </AnimatedText>
      <AnimatedText style={[animatedDescriptionStyle]} fontSize={'$md'}>
        {item.job}
      </AnimatedText>

      <Box position='relative' style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#ffa',
              width: 100,
              height: 100,
              borderRadius: 100,
            },
            animatedStyle,
          ]}
        />
        <Pressable
          onPress={() => {
            animatedValue.value = withRepeat(withSpring(120), 10, true);
          }}
          style={{
            backgroundColor: '#ff0',
            width: 100,
            height: 100,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text color='#000'>Press</Text>
        </Pressable>
      </Box>
    </Center>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
