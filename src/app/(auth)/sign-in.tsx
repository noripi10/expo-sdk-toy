import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/Protected';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function SignIn() {
  const { setUser } = useAuth();
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Sign-In Page</Text>
        <Pressable
          onPress={() => {
            setUser({ id: '123', name: 'noripi10' });
            router.replace('/');
          }}
        >
          {() => <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>Go To Home Screen</Text>}
        </Pressable>
      </>
    </View>
  );
}
