import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { useDispatch } from 'react-redux';
import { ButtonText } from '../../../components';
import { colors, SCREEN_HEIGHT, SCREEN_WIDTH, sizes } from '../../../constants';
import { addKtpImage } from '../../../redux/reducers/KtpReducer';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

const DaftarKtpCameraScreen = () => {
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint },
    { takePicture },
  ] = useCamera(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const takePic = async () => {
    try {
      const data = await takePicture();
      RNFS.readFile(data.uri, 'base64').then(res => {
        dispatch(addKtpImage(res));
        navigation.goBack();
      });
    } catch {
      e => {
        console.log(e);
      };
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{ ...StyleSheet.absoluteFill }}
        autoFocus={autoFocus}
        captureAudio={false}
      />

      <View style={styles.ktpFrame} />

      <ButtonText
        onPress={() => takePic()}
        text="Ambil Gambar"
        buttonContainerStyle={{
          position: 'absolute',
          bottom: sizes.padding,
          width: '50%',
        }}
      />
    </View>
  );
};

export default DaftarKtpCameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  ktpFrame: {
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 3,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.3,
  },
});
