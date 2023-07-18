import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function Hero() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hero Page</Text>
        <Pressable onPress={() => router.replace('/(auth)/sign-in')}>
          {() => <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>Go To Sign-In</Text>}
        </Pressable>
      </>
    </View>
  );
}
