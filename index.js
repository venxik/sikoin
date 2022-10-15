/**
 * @format
 */
import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import { name as appName } from './app.json';
import App from './src/App';

// Register background handler
// eslint-disable-next-line no-unused-vars
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('Message handled in the background!', remoteMessage);
});

// function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     // App has been launched in the background by iOS, ignore
//     return null;
//   }
//   return <App />;
// }

AppRegistry.registerComponent(appName, () => App);
