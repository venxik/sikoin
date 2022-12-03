import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, HeaderBack } from '../../components';
import { ParentStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<ParentStackParamList, 'DaftarKoperasiSuccessScreen'>;

const DaftarKoperasiSuccessScreen: FC<Props> = ({ navigation, route }) => {
  const { email } = route.params;
  const navigateToLoginScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      {/* TOP SIDE */}
      <View style={styles.topContainer}>
        <View style={styles.topInnerContainer}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.13}
            rotation={180}
            width={3}
            fill={100}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}
          >
            {() => <Image source={icons.icon_email} style={styles.iconStyle} />}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{'Sip! Kami verifikasi dulu ya'}</Text>
        </View>
        <Text style={styles.textContent1}>
          {
            'Biasanya akan membutuhkan waktu beberapa menit, tetapi terkadang bisa beberapa jam. Kami akan mengirimkan password sementara ke email'
          }
          <Text style={styles.textEmail}>
            {email}
            <Text style={styles.textContent2}>{`untuk login ke aplikasi ${Config.APP_NAME}.`}</Text>
          </Text>
        </Text>
      </View>

      <Button
        onPress={navigateToLoginScreen}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.kembali_ke_login}
        icon={icons.arrow_left_button_white}
        iconLocation="left"
      />
    </SafeAreaView>
  );
};
export default DaftarKoperasiSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: sizes.padding,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
  },
  topInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {
    marginLeft: 16,
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
  },
  bottomContainer: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    margin: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  iconStyle: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
  },
  textContent1: {
    marginTop: 16,
    color: colors.bodyText,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  textEmail: {
    fontSize: 17,
    color: colors.primary,
    fontFamily: 'Poppins-Bold',
    marginVertical: sizes.padding,
  },
  textContent2: {
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
});
