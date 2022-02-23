import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ProviderWrapper, RouterContainer } from 'config/navigation';
import { store } from 'config/store/ReduxStore';
import { fcmService } from './utils/FCMService';
import { localNotificationService } from './utils/LocalNotificationService';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    PushNotification.createChannel(
      {
        channelId: 'my-channel', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`CreateChannel returned '${created}'`),
    );

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
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
      console.log('[App] onOpenNotification: ', notify);
      Alert.alert('Open Notification: ' + notify.body);
    }

    return () => {
      console.log('[App] unregister');
      fcmService.unregister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <ProviderWrapper store={store}>
      <PaperProvider>
        <RouterContainer />
      </PaperProvider>
    </ProviderWrapper>
  );
};

export default App;
