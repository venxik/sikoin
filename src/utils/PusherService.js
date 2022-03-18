import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';

export const pusher = new Pusher(Config.PUSHER_KEY, {
  appId: Config.PUSHER_APP_ID,
  key: Config.PUSHER_KEY,
  secret: Config.PUSHER_SECRET,
  cluster: Config.PUSHER_CLUSTER,
  encrypted: true,
});
