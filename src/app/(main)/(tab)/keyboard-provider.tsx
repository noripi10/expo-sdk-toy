import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInputSelectionChangeEventData } from 'react-native';
import { TextInput } from 'react-native';

import Animated, { runOnJS, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  useKeyboardHandler,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';

import { Box, HStack, Switch, Text } from '@gluestack-ui/themed';

import { KeyBoardAccessory } from '@/components/KeyBoardAccessory';
import EditScreenInfo from '@/components/EditScreenInfo';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
console.info({ WIDTH, HEIGHT });

export default function KeyboardPage() {
  const { top } = useSafeAreaInsets();

  const inputRef = useRef<TextInput>(null);

  const [text, setText] = useState(DefaultText);
  const [selection, setSelection] = useState<TextInputSelectionChangeEventData['selection']>({ start: 0, end: 0 });

  const [editing, setEditing] = useState(true);

  // const progress = useSharedValue(0);

  // useKeyboardHandler(
  //   {
  //     onMove: (e) => {
  //       'worklet';
  //       progress.value = e.progress;
  //     },
  //   },
  //   []
  // );

  const { height, progress } = useReanimatedKeyboardAnimation();

  // Keyboardの高さを監視する
  const changeHandler = (progress: number, height: number) => console.info({ progress, height });
  useDerivedValue(() => runOnJS(changeHandler)(progress.value, height.value));

  const inputComponentStyle = useAnimatedStyle(() => {
    if (progress.value === 1) {
      // heigth.value
      // 隠れているときは0, 表示されているときはoffset的にマイナス値
      // 48
      // accessaryの高さ分
      const avoidHeight = HEIGHT + height.value - 48;
      return {
        flex: 1,
        maxHeight: avoidHeight,
      };
    }
    return {
      flex: 1,
      maxHeight: HEIGHT,
    };
  });

  return (
    <>
      {/* <KeyboardAvoidingView
        behavior='position'
        contentContainerStyle={styles.container}
        // keyboardVerticalOffset={48}
        style={styles.content}
      >
        <Box flex={1} alignItems='center' justifyContent='center' pt={top + 32} mx={'$4'}>
          <Text style={styles.title}>Keyboard Avoiding Controller</Text>
          <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
          <EditScreenInfo path='app/(main)/two.tsx' />

          <Center justifyContent='center' alignItems='center'>
            <Input borderRadius={'$md'}>
              <InputField px={'$2'} placeholder='input field' />
            </Input>
          </Center>

          <Center w='$full' py='$6'>
            <Button bgColor='$orange500' sx={{ ':active': { bgColor: '$orange400' } }} borderRadius={'$xl'} w={'$full'}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </Center>
        </Box>
      </KeyboardAvoidingView> */}

      <Box flex={1}>
        <Animated.View style={[{ flex: 1, padding: 4, paddingTop: top }, inputComponentStyle]}>
          <HStack justifyContent='flex-end' px={'$2'} py={'$1'} alignItems='center' gap={'$1'}>
            <Text>Editing</Text>
            <Switch size='md' value={editing} onValueChange={setEditing} />
          </HStack>
          <TextInput
            ref={inputRef}
            style={{
              fontSize: 14,
              borderWidth: 0,
              borderRadius: 10,
              flex: 1,
              padding: 12,
              backgroundColor: '#222',
              color: '#fff',
            }}
            multiline
            value={text}
            onChangeText={setText}
            onSelectionChange={(e) => {
              // console.info(e.nativeEvent.selection);
              setSelection(e.nativeEvent.selection);
            }}
            onContentSizeChange={(e) => {
              console.info('onContentSizeChange', e.nativeEvent.contentSize);
            }}
            editable={editing}
          />
        </Animated.View>
      </Box>

      <KeyBoardAccessory {...{ inputRef, selection, setSelection }} />
      {/* <Box position='absolute' bottom={0} left={0} bgColor='$red400' w={393} h={336} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    maxHeight: 600,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const DefaultText = `React Native
Learn once, write anywhere.

Create native apps for Android, iOS, and more using React
React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.

Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.

Written in JavaScript—rendered with native code
React primitives render to native platform UI, meaning your app uses the same native platform APIs other apps do.

Many platforms, one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain multiple platforms and share a common technology—React.

Native Development For Everyone
React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform’s native UI building blocks.

React Native
Learn once, write anywhere.

Create native apps for Android, iOS, and more using React
React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.

Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.

Written in JavaScript—rendered with native code
React primitives render to native platform UI, meaning your app uses the same native platform APIs other apps do.

Many platforms, one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain multiple platforms and share a common technology—React.

Native Development For Everyone
React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform’s native UI building blocks.

`;
