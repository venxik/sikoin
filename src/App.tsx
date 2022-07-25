/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react';
import { RouterContainer } from './config/navigation';
import { store, persist } from './config';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import useNotification from './hooks/useNotification';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const App: FC = () => {
  const { displayNotification } = useNotification();

  // check and authorize user permission
  async function requestUserPermission() {
    await messaging().requestPermission();
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   // console.log('Authorization status:', authStatus);
    // } else {
    //   // console.log('User declined permissions');
    // }
  }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // Startup Process
    const onProcess = async () => {
      // request user requiremnet permission
      requestUserPermission();
      // init bootstrap for firebase analytics

      // notifee.onBackgroundEvent(async ({ type }) => {
      notifee.onBackgroundEvent(async () => {
        // if (type === EventType.PRESS) {
        // console.log('User pressed the notification.', detail.pressAction.id);
        // }
      });

      messaging().setBackgroundMessageHandler(
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          // Get message image
          // const avatar = remoteMessage.notification.android.imageUrl;

          // Show an alert to the user
          displayNotification(
            remoteMessage?.notification?.title,
            remoteMessage?.notification?.body,
          );
        },
      );
    };
    onProcess();

    // return subscribe;
  }, []);

  // useEffect(() => {
  // setTimeout(() => {
  //   SplashScreen.hide();
  // }, 2000);
  //   fcmService.register(onRegister, onNotification, onOpenNotification);
  //   localNotificationService.configure(onOpenNotification);

  //   PushNotification.createChannel(
  //     {
  //       channelId: 'my-channel', // (required)
  //       channelName: 'My channel', // (required)
  //     },
  //     () => null,
  //   );

  //   function onRegister(token: any) {
  //     // console.log('[App] onRegister: ', token);
  //   }

  //   function onNotification(notify: any) {
  //     // console.log('[App] onNotification: ', notify);
  //     const options = {
  //       soundName: 'default',
  //       playSound: true,
  //     };
  //     localNotificationService.showNotification(
  //       '0',
  //       notify.title,
  //       notify.body,
  //       notify,
  //       options,
  //     );
  //   }

  //   function onOpenNotification(notify: any) {
  //     // console.log('[App] onOpenNotification: ', notify);
  //     Alert.alert('Open Notification: ' + notify.body);
  //   }

  //   return () => {
  //     // console.log('[App] unregister');
  //     fcmService.unregister();
  //     localNotificationService.unregister();
  //   };
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate persistor={persist} loading={null}>
            <MenuProvider>
              <RouterContainer />
            </MenuProvider>
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
