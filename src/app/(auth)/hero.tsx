import { Button, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Updates from 'expo-updates';

import { Text, View } from '@/components/Themed';
import { t } from '@/libs/i18n';

export default function Hero() {
  const router = useRouter();

  const localeHandler = async (locale: string) => {
    await AsyncStorage.setItem('locale', locale);

    if (typeof window === 'undefined') {
      Updates.reloadAsync();
    } else {
      window.location.reload();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32 }}>
      <>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hero Page</Text>

        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{t('welcome')}</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title='Change English' onPress={() => localeHandler('en')} />
          <Button title='Change Japanese' onPress={() => localeHandler('ja')} />
        </View>

        <Pressable onPress={() => router.replace('/(auth)/nurie')}>
          {() => <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>Go To Nurie</Text>}
        </Pressable>

        <Pressable onPress={() => router.replace('/(auth)/sign-in')}>
          {() => <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>Go To Sign-In</Text>}
        </Pressable>
      </>
    </View>
  );
}
