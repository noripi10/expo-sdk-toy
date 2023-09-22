import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Center, Input, InputField } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior='padding'
      contentContainerStyle={styles.container}
      keyboardVerticalOffset={100}
      style={styles.content}
    >
      <Center flex={1} justifyContent='center' alignItems='center' pt={top}>
        <Text style={styles.title}>Two</Text>
        <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
        <EditScreenInfo path='app/(main)/two.tsx' />

        <Input mx={'$4'} borderRadius={'$md'}>
          <InputField px={'$2'} placeholder='input field' />
        </Input>
      </Center>
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
