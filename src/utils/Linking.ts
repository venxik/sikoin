import { Linking } from 'react-native';

export const openUrl = (url: string) => {
  Linking.canOpenURL(url as string)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url as string);
      }
    })
    .catch((err: unknown) => console.error('An error occurred', err));
};
