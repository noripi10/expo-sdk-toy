import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, useKeyboardHandler } from 'react-native-keyboard-controller';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import { Box, Button, ButtonText, Center, Input, InputField } from '@gluestack-ui/themed';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useSharedValue } from 'react-native-reanimated';

export default function TabTwoScreen() {
  const { top } = useSafeAreaInsets();

  const progress = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: (e) => {
        'worklet';
        progress.value = e.progress;
      },
    },
    []
  );

  const changeHandler = (val: number) => console.info({ val });

  useDerivedValue(() => runOnJS(changeHandler)(progress.value));

  return (
    <KeyboardAvoidingView
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
    </KeyboardAvoidingView>
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
