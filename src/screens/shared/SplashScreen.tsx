import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { isEmpty } from 'lodash';
import Config from 'react-native-config';

import { Popup1Button } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { navigateAndReset } from '../../config/navigation';
import { images, sizes } from '../../constants';
import { fetchVersionNumber } from '../../redux/reducers/LoginReducer';
import { AsyncStore } from '../../utils';

const SplashScreen: React.FC = () => {
  const { userId } = useAppSelector((s) => s.HomeReducer.user);
  const { versionNumber } = useAppSelector((s) => s.LoginReducer);
  const [showPopup, setShowPopup] = useState(false);
  const [imageSource, setImageSource] = useState(images.splash_screen);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchVersionNumber());

    const timer = setTimeout(() => {
      setImageSource(images.splash_screen_2);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (!isEmpty(versionNumber)) {
      if (versionNumber === Config.VERSION_NUMBER) {
        validateNavigation();
        return;
      } else {
        setShowPopup(true);
      }
    }
  }, [versionNumber]);

  const validateNavigation = async () => {
    const data = await AsyncStore.getData('@onboardingComplete');
    const timer = setTimeout(() => {
      if (userId !== 0) {
        navigateAndReset('HomeTab');
        return;
      } else if (!isEmpty(data)) {
        navigateAndReset('LoginScreen');
        return;
      } else {
        navigateAndReset('OnboardingScreen');
        return;
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.splash} />
      <Popup1Button
        iconStyle={{ width: 150, height: 200, marginBottom: -sizes.padding }}
        headerText={'Versi Terbaru'}
        contentText={'Silahkan Update Aplikasi Versi Terbaru'}
        showPopup={showPopup}
        onPress={() => setShowPopup((e) => !e)}
        // headerImage={images.img_topup_popup}
        customButtonText={'OK'}
      />
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
