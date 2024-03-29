/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';

class FCMService {
  messageListener: any = null;

  register = (onRegister: any, onNotification: any, onOpenNotification: any) => {
    this.checkPermission(onRegister);
    this.createNotificationListener(onRegister, onNotification, onOpenNotification);
  };

  registerAppWithFCM = async () => {
    if (Platform.OS == 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister: any) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        // console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = (onRegister: any) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          // console.log('[FCMService] User does not have device token');
        }
      })
      .catch((error) => {
        // console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = (onRegister: any) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        // console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        // console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListener = (onRegister: any, onNotification: any, onOpenNotification: any) => {
    //When application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.warn(
        // '[FCMService] onNotificationOpenedApp Notification caused app to open from background ',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    //When application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(
        //   '[FCMService] onNotificationOpenedApp Notification caused app to open from quit state ',
        //   remoteMessage,
        // );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    //Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      // console.log('[FCMService] A new FCM message arrived! ', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS == 'ios') {
          notification = remoteMessage?.data?.notification;
        } else {
          notification = remoteMessage?.notification;
        }

        onNotification(notification);
      }
    });

    //Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      // console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unregister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
