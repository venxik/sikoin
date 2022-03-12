import React, { useEffect } from 'react';
import { RouterContainer } from '../src/config/navigation';
import { store, persist } from '../src/config/store/ReduxStore';
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

const App = () => {
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
      // created => console.log(`CreateChannel returned '${created}'`),
    );

    function onRegister(token) {
      // console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      // console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
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
