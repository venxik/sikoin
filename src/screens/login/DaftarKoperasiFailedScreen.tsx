import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ArrowLeft } from 'react-native-iconly';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, HeaderBack } from '../../components';
import { ParentStackParamList } from '../../config/navigation/model';
import {
  colors,
  images,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  strings,
} from '../../constants';

type Props = NativeStackScreenProps<
  ParentStackParamList,
  'DaftarKoperasiFailedScreen'
>;

const DaftarKoperasiFailedScreen: React.FC<Props> = ({ navigation }) => {
  const onClickAyo = () => {
    console.log('GO TO CLUB');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        style={{ zIndex: 2, width: '100%' }}
        customLeftIcon={<ArrowLeft color={colors.white} />}
      />
      <Image
        style={styles.background}
        resizeMode="stretch"
        source={images.daftar_koperasi_bg}
      />
      <Image
        style={styles.bgImage2}
        resizeMode="stretch"
        source={images.daftar_koperasi_question_mark_2}
      />

      <Text style={styles.textTitle}>
        {strings.daftar_koperasi_failed_title}
      </Text>

      <View style={styles.buttonContainer2}>
        <Button
          onPress={() => onClickAyo}
          buttonContainerStyle={styles.buttonStyle2}
          text={strings.ayo}
          secondary
          textStyle={styles.textButton}
        />
      </View>
    </SafeAreaView>
  );
};
export default DaftarKoperasiFailedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  bgImage1: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  bgImage2: {
    width: '80%',
    height: '95%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  textTitle: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.4,
    color: colors.tonalLightPrimary,
    fontSize: 24,
    paddingHorizontal: 40,
    zIndex: 200,
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer1: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 40,
    zIndex: 10,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.3,
  },
  buttonContainer2: {
    width: '100%',
    paddingHorizontal: 40,
    zIndex: 10,
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.3,
  },
  buttonLeftStyle: {
    width: '47%',
    paddingVertical: SCREEN_WIDTH * 0.02,
    backgroundColor: colors.white,
  },
  buttonRightStyle: {
    width: '47%',
    paddingVertical: SCREEN_WIDTH * 0.02,
  },
  buttonStyle2: {
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.02,
    backgroundColor: colors.white,
  },
  textButton: { fontFamily: 'Poppins-SemiBold' },
});
