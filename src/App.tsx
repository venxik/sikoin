/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react';
import { RouterContainer } from './config/navigation';
import { store, persist } from './config';
import { fcmService } from './utils/FCMService';
import { localNotificationService } from './utils/LocalNotificationService';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';

const App: FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    PushNotification.createChannel(
      {
        channelId: 'my-channel', // (required)
        channelName: 'My channel', // (required)
      },
      () => null,
    );

    function onRegister(token: any) {
      // console.log('[App] onRegister: ', token);
    }

    function onNotification(notify: any) {
      // console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        '0',
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify: any) {
      // console.log('[App] onOpenNotification: ', notify);
      Alert.alert('Open Notification: ' + notify.body);
    }

    return () => {
      // console.log('[App] unregister');
      fcmService.unregister();
      localNotificationService.unregister();
    };
  }, []);

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
