import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('Received a notification in the background!');
  // Do something with the notification data

  const dataString = JSON.stringify(data ?? {});
  AsyncStorage.setItem(
    BACKGROUND_NOTIFICATION_TASK,
    `BackgroundNotificationRecieve | ${new Date().toISOString()} | ${dataString}`
  );
});

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
