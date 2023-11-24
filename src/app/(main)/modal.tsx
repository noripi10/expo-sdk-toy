import { Dimensions, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Heading } from '@gluestack-ui/themed';

const { width: WIDTH } = Dimensions.get('window');

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Heading p={'$2'}>Modal Container</Heading>

      <Animated.Image
        alt=''
        source={require('@assets/images/sea.jpg')}
        style={{ width: WIDTH, height: 'auto', aspectRatio: 16 / 9 }}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        sharedTransitionTag='transition-image'
      />

      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <EditScreenInfo path='app/modal.tsx' />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

      <Link href='/'>
        <Text>Go To Home Screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
