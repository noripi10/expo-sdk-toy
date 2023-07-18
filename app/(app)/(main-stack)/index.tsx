import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.continer}>
      <Link asChild href='/_sitemap'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>SiteMap</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link asChild href='/modal'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Modal</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link asChild href='/face-detector'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Face-Detector</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Pressable onPress={() => router.replace('/(auth)/hero')}>
        {({ pressed }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name='sign-out'
              size={25}
              color={Colors[useColorScheme() ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
            <Text>Logout</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 8,
    gap: 6,
  },
});
