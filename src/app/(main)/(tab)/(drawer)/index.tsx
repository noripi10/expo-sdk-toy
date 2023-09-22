import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { Button, ButtonText } from '@gluestack-ui/themed';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useWidth } from '@/hooks/useWidth';
import { useNotification } from '@/hooks/useNotification';

export default function Menu() {
  const { top } = useSafeAreaInsets();

  const { requestPermissions, isNofification, testScheduleNotification } = useNotification();
  const flexibleWidth = useWidth();

  return (
    <View style={[styles.continer, { paddingTop: top, width: flexibleWidth, margin: 'auto' }]}>
      <Links />

      <Button onPress={requestPermissions} rounded={'$xl'}>
        <ButtonText>Request Push Notification</ButtonText>
      </Button>
      <Button action={'positive'} rounded={'$xl'} disabled={!isNofification} onPress={testScheduleNotification}>
        <ButtonText>Test Notification</ButtonText>
      </Button>
    </View>
  );
}

const Links = () => {
  return (
    <>
      <Link asChild href='/_sitemap' style={{ display: __DEV__ ? 'flex' : 'none' }}>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Go to SiteMap</Text>
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
              <Text>Go to Face-Detector</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link asChild href='/setting'>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[useColorScheme() ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>Go to Setting</Text>
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
              <Text>Go to Modal</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 8,
    gap: 6,
  },
});
