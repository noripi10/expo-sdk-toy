import { allCards, allExpenses } from '@/constants/data';
import { Box, Center, HStack, Heading, Text } from '@gluestack-ui/themed';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const CARD_HEIGHT = 120;
const TITLE_HEIGHT = 80;

export default function ScrollAnimationPage() {
  const insets = useSafeAreaInsets();
  const window = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  useDerivedValue(() => {
    console.info(scrollY.value);
  });

  const headerTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 160], [0, -80], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const cardListStyle = useAnimatedStyle(() => {
    return {
      top: Math.max(0, -(scrollY.value - TITLE_HEIGHT)),
    };
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: interpolate(scrollY.value, [0, 80], [16, 0], Extrapolate.CLAMP),
      height: interpolate(scrollY.value, [0, 80], [CARD_HEIGHT, CARD_HEIGHT + insets.top], Extrapolate.CLAMP),
    };
  });

  const cardContentStyle = useAnimatedStyle(() => {
    const radius = interpolate(scrollY.value, [0, 80], [24, 0], Extrapolate.CLAMP);

    return {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      paddingBottom: interpolate(scrollY.value, [0, 80], [0, 20], Extrapolate.CLAMP),
    };
  });

  return (
    <Box flex={1}>
      <Animated.FlatList
        style={{ flex: 1 }}
        data={allExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HStack flex={1} px={'$2'} py={'$0.5'}>
            <Box flexGrow={1}>
              <Text fontWeight='$bold'>{item.title}</Text>
              <Text>{item.type}</Text>
            </Box>
            <Center>
              <Text>{item.price}</Text>
            </Center>
          </HStack>
        )}
        ListHeaderComponent={() => (
          <Box>
            <View style={{ height: TITLE_HEIGHT }} />
            <View style={{ height: CARD_HEIGHT }} />
            <Box p={'$4'} />
          </Box>
        )}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />

      <Animated.View
        style={[{ position: 'absolute', top: 0, height: TITLE_HEIGHT, justifyContent: 'center' }, headerTitleStyle]}
      >
        <Heading alignItems='center' fontSize={32} fontWeight='$extrabold' px={'$4'}>
          List Header Component
        </Heading>
      </Animated.View>

      <Animated.FlatList
        style={[{ position: 'absolute', top: 0, left: 0 }, cardListStyle]}
        data={allCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animated.View style={[{ width: window.width, height: CARD_HEIGHT }, cardStyle]}>
            <Animated.View
              style={[
                {
                  flex: 1,
                  backgroundColor: item.color,
                  borderRadius: 24,
                  position: 'relative',
                  justifyContent: 'flex-end',

                  paddingHorizontal: 24,
                  overflow: 'hidden',
                },
                cardContentStyle,
              ]}
            >
              <Box
                bgColor={'#fff'}
                opacity={0.1}
                width={300}
                height={300}
                borderRadius={150}
                position={'absolute'}
                left={-80}
                top={-60}
                flexWrap='nowrap'
              />
              <Box pb={'$4'}>
                <Text fontWeight='$bold' fontSize={24}>
                  Current Balance
                </Text>
                <Text>{item.balance.toLocaleString()}</Text>
              </Box>
            </Animated.View>
          </Animated.View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </Box>
  );
}
