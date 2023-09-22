import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isNofification, setNotification] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'web') {
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (!Device.isDevice) {
      alert('Must use physical device for Push Notifications');
      return false;
    }

    const result = await Notifications.getPermissionsAsync();
    let status = false;
    if (result.status === 'granted') {
      setNotification(true);
      status = true;
    } else {
      if (!result.canAskAgain) {
        // TODO アプリ設定画面を開く
        alert("'Failed to get push token for push notification!");
        return;
      }

      const askResult = await Notifications.requestPermissionsAsync();
      if (askResult.status === 'granted') {
        setNotification(true);
        status = true;
      }
    }

    if (!status) {
      alert("'Failed to get push token for push notification!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas.projectId }))
      .data;

    setExpoPushToken(token);
    console.info({ token });
    return token;
  };

  const testScheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'test title',
        body: 'test body',
        sound: 'dafault',
        data: {
          // 遷移先を指定する
          url: '/',
        },
        // category別のアクションを設定しておく
        categoryIdentifier: 'test',
      },
      trigger: {
        seconds: 2,
        channelId: 'channel_1',
      },
    });
  };

  const registerTestCategory = async () => {
    const actions = await Notifications.getNotificationCategoriesAsync();
    if (actions.length) {
      const isReg = actions.some((e) => e.identifier === 'test');
      if (isReg) {
        await Notifications.deleteNotificationCategoryAsync('test');
      }
    }

    await Notifications.setNotificationCategoryAsync('test', [
      {
        identifier: 'id_action1',
        buttonTitle: 'Action1',
        textInput: { placeholder: 'text_action1', submitButtonTitle: 'submit_action1' },
      },
      {
        identifier: 'id_action2',
        buttonTitle: 'Action2',
        textInput: { placeholder: 'text_action2', submitButtonTitle: 'submit_action2' },
      },
      {
        identifier: 'id_action3',
        buttonTitle: 'Action3',
      },
    ]);
  };

  useEffect(() => {
    (() => {
      if (Platform.OS === 'web') {
        return;
      }

      Notifications.getPermissionsAsync().then((result) => {
        if (result.status !== 'granted') {
          return;
        }

        setNotification(true);

        Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas.projectId }).then(
          (result) => {
            if (!expoPushToken || result.data !== expoPushToken) {
              setExpoPushToken(result.data);
              console.info({ token: result.data });
            }
          }
        );
      });

      registerTestCategory();
    })();
  }, [expoPushToken]);

  return { expoPushToken, isNofification, requestPermissions, testScheduleNotification };
};
