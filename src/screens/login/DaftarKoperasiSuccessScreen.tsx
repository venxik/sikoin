import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonText, HeaderBack } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DaftarKoperasiParamList } from '../../config/types/NavigationTypes';
import { useAppSelector } from '../../config/store/ReduxStore';

type Props = NativeStackScreenProps<
  DaftarKoperasiParamList,
  'DaftarKoperasiSuccessScreen'
>;

const DaftarKoperasiSuccessScreen = ({ navigation }: Props) => {
  const { email } =
    useAppSelector(state => state.ProfileReducer.profileData) || {};

  const navigateToLoginScreen = () => {
    navigation.dispatch(() => {
      return CommonActions.reset({
        index: 1,
        routes: [{ name: 'LoginScreen' }],
      });
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
            backgroundColor={colors.primaryLight}>
            {() => <Image source={icons.icon_email} style={styles.iconStyle} />}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.cek_inbox}</Text>
        </View>
        <Text style={styles.textContent1}>
          {strings.daftar_koperasi_success_1}
        </Text>
        <Text style={styles.textEmail}>{email}</Text>
        <Text style={styles.textContent2}>
          {strings.daftar_koperasi_success_2}
        </Text>
      </View>

      <ButtonText
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
