import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Sound } from '@/components/Sound';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { avatarImagebase64 } from '@/constants/image';
import { CustomThemeContext } from '@/context/Theme';
import { useNotification } from '@/hooks/useNotification';
import { useWidth } from '@/hooks/useWidth';
import {
  Alert,
  AlertIcon,
  AlertText,
  BellIcon,
  Box,
  Button,
  ButtonText,
  Center,
  InfoIcon,
  ScrollView,
  SunIcon,
} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

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
  const router = useRouter();
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

        <Link asChild href='/bottom-sheet'>
          <Pressable>
            {({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                  name='info-circle'
                  size={25}
                  color={Colors[customColorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
                <Text>Go to Bottom-Sheet</Text>
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

        <>
          <Pressable onPress={() => router.push('/modal')}>
            {({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                  name='info-circle'
                  size={25}
                  color={Colors[customColorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
                <Text>Go to Modal</Text>
                <Animated.Image
                  alt=''
                  source={require('@assets/images/sea.jpg')}
                  style={{ width: 200, height: 200, aspectRatio: 16 / 9, marginHorizontal: 4, borderRadius: 8 }}
                  resizeMethod={'resize'}
                  resizeMode={'cover'}
                  sharedTransitionTag='transition-image'
                />
              </View>
            )}
          </Pressable>
        </>
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
