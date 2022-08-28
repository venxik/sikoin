import { isEmpty } from 'lodash';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useAppSelector } from '../../config';
import { navigateAndReset } from '../../config/navigation';
import { images } from '../../constants';
import { AsyncStore } from '../../utils';

const SplashScreen: React.FC = () => {
  const { userId } = useAppSelector(s => s.HomeReducer.user);

  React.useEffect(() => {
    validateNavigation();
  }, []);

  const validateNavigation = async () => {
    const data = await AsyncStore.getData('@onboardingComplete');
    setTimeout(() => {
      if (userId > 0) {
        navigateAndReset('HomeTab');
      } else if (!isEmpty(data)) {
        navigateAndReset('LoginScreen');
      } else {
        navigateAndReset('OnboardingScreen');
      }
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <Image source={images.splash_screen} style={styles.splash} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
