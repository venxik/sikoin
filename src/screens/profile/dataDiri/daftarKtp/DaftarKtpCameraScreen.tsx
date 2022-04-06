import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { Button } from '../../../../components';
import {
  colors,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
} from '../../../../constants';
import { addKtpImage } from '../../../../redux/reducers/KtpReducer';
import RNFS from 'react-native-fs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch } from '../../../../config';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarKtpCameraScreen'
>;

const DaftarKtpCameraScreen: React.FC<Props> = ({ navigation }) => {
  const [{ cameraRef, ratio, autoFocusPoint }, { takePicture }] = useCamera();
  const dispatch = useAppDispatch();

  const takePic = async () => {
    try {
      const data = await takePicture();
      RNFS.readFile(data.uri, 'base64').then(res => {
        dispatch(addKtpImage(res));
        navigation.goBack();
      });
    } catch {
      (e: any) => {
        console.log(e);
      };
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={'back'}
        ratio={ratio}
        style={{ ...StyleSheet.absoluteFillObject }}
        autoFocus={'on'}
        captureAudio={false}
      />

      <View style={styles.ktpFrame} />

      <Button
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
