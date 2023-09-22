import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function SignIn() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Sign-In Page</Text>
        <Pressable onPress={() => router.replace('/')}>
          {() => <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>Go To Home Screen</Text>}
        </Pressable>
      </>
    </View>
  );
}
