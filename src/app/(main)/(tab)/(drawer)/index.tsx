import React, { useContext, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import {
  Alert,
  AlertIcon,
  AlertText,
  Button,
  ButtonText,
  InfoIcon,
  BellIcon,
  SunIcon,
  ScrollView,
  Box,
} from '@gluestack-ui/themed';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useWidth } from '@/hooks/useWidth';
import { useNotification } from '@/hooks/useNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomThemeContext } from '@/context/Theme';
import { Sound } from '@/components/Sound';

export default function Menu() {
  const { top } = useSafeAreaInsets();

  const { customColorScheme } = useContext(CustomThemeContext);
  const { expoPushToken, requestPermissions, isNofification, testScheduleNotification } = useNotification();
  const flexibleWidth = useWidth();

  const [notificationResult, setNotificationResult] = useState<string | null>(null);

  useLayoutEffect(() => {
    AsyncStorage.getItem('BACKGROUND-NOTIFICATION-TASK').then((d) => setNotificationResult(d));
  });

  return (
    <ScrollView style={[styles.continer, { width: flexibleWidth, margin: 'auto' }]}>
      <Box flex={1} gap={'$1.5'} pb={'$5'}>
        <Sound />

        <Links />

        <Button onPress={requestPermissions} rounded={'$xl'}>
          <ButtonText>Request Push Notification Token</ButtonText>
        </Button>

        <Button action={'negative'} rounded={'$xl'} disabled={!isNofification} onPress={testScheduleNotification}>
          <ButtonText>Test Push Notification</ButtonText>
        </Button>

        <Alert action='info' borderRadius={'$lg'}>
          <AlertIcon as={InfoIcon} mr='$2' />
          <AlertText fontSize={'$sm'}>{expoPushToken}</AlertText>
        </Alert>

        <Alert action='success' borderRadius={'$lg'}>
          <AlertIcon as={BellIcon} mr='$2' />
          <AlertText fontSize={'$sm'}>{notificationResult}</AlertText>
        </Alert>

        <Alert action='warning' borderRadius={'$lg'}>
          <AlertIcon as={SunIcon} mr='$2' />
          <AlertText fontSize={'$sm'} textTransform='uppercase'>
            {customColorScheme ? `theme: ${customColorScheme}` : ''}
          </AlertText>
        </Alert>

        <Button
          action={'positive'}
          rounded={'$xl'}
          h={'$16'}
          onPress={async () => {
            try {
              const result = await FileSystem.downloadAsync(
                'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                `${FileSystem.documentDirectory}big_buck_bunny.mp4`
              );
              console.info({ result });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <ButtonText>{'Download File\nbig_buck_bunny.mp4'}</ButtonText>
        </Button>

        <Text>documentDirectory</Text>
        <Alert action='info' borderRadius={'$lg'}>
          <AlertIcon as={InfoIcon} mr={'$2'} />
          <AlertText fontSize={'$xs'}>{FileSystem.documentDirectory}</AlertText>
        </Alert>

        <Text>cacheDirectory</Text>
        <Alert action='info' borderRadius={'$lg'}>
          <AlertIcon as={InfoIcon} mr={'$2'} />
          <AlertText fontSize={'$xs'}>{FileSystem.cacheDirectory}</AlertText>
        </Alert>
      </Box>
    </ScrollView>
  );
}

const Links = () => {
  const { customColorScheme } = useContext(CustomThemeContext);

  return (
    <>
      <Box flexDirection='row' flexWrap='wrap' gap={'$1'}>
        <Link asChild href='/_sitemap' style={{ display: __DEV__ ? 'flex' : 'none' }}>
          <Pressable>
            {({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                  name='info-circle'
                  size={25}
                  color={Colors[customColorScheme ?? 'light'].text}
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
                  color={Colors[customColorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
                <Text>Go to Face-Detector</Text>
              </View>
            )}
          </Pressable>
        </Link>

        <Link asChild href='/scroll-animation'>
          <Pressable>
            {({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                  name='info-circle'
                  size={25}
                  color={Colors[customColorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
                <Text>Go to Scroll-Animation</Text>
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
                  color={Colors[customColorScheme ?? 'light'].text}
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
                  color={Colors[customColorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
                <Text>Go to Modal</Text>
              </View>
            )}
          </Pressable>
        </Link>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    padding: 8,
  },
});
