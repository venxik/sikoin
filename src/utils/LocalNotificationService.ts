import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
class LocalNotificationService {
  configure = (onOpenNotification: any) => {
    PushNotification.configure({
      onRegister: function (token: { os: string; token: string }) {
        // console.log('[LocalNotificationService] onRegister: ', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification: any) {
        // console.log('[LocalNotificationService] onNotification:', notification);
        if (!notification.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS == 'ios' ? notification.data.item : notification.data,
        );

        if (Platform.OS == 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification: any) {
        // console.log('ACTION:', notification.action);
        // console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (
    id: string,
    data: any,
    title?: string,
    message?: string,
    options?: any,
  ) => {
    PushNotification.localNotification({
      //Android only Properties
      ...this.buildAndroidNotification(id, data, title, message, options),
      //iOS and Android properties
      ...this.buildIOSNotification(id, data, title, message, options),
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
    });
  };

  buildAndroidNotification = (
    id: string,
    data: any,
    title?: string,
    message?: string,
    options?: any,
  ) => {
    return {
      channelId: 'my-channel',
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcer',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  buildIOSNotification = (
    id: string,
    data: any,
    title?: string,
    message?: string,
    options?: any,
  ) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllNotifications = () => {
    if (Platform.OS == 'ios') {
      PushNotification.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = (id: string) => {
    PushNotification.cancelLocalNotification(id);
  };
}

export const localNotificationService = new LocalNotificationService();
