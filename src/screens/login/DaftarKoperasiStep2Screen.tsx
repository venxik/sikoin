import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonText, HeaderBack, TextInputBorder } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DaftarKoperasiParamList } from '../../config/types/NavigationTypes';

type Props = NativeStackScreenProps<
  DaftarKoperasiParamList,
  'DaftarKoperasiStep2Screen'
>;

const DaftarKoperasiStep2Screen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const navigateToSuccessScreen = () => {
    navigation.navigate('DaftarKoperasiSuccessScreen');
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
            fill={50}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => <Text style={styles.textCircle}>2/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text style={styles.textTitle2}>
          {strings.daftar_koperasi_isi_data_title_2}
        </Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        <TextInputBorder
          value={email}
          onChangeText={e => onChangeEmail(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_nama_koperasimu}
          icon={icons.icon_email}
        />
        <Text style={styles.textHint}>
          {strings.daftar_koperasi_isi_data_hint_2}
        </Text>
      </View>

      <ButtonText
        onPress={navigateToSuccessScreen}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.kirim_otp_ke_email}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      />
    </SafeAreaView>
  );
};
export default DaftarKoperasiStep2Screen;

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
  textTitle2: {
    marginTop: 16,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
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
  textCircle: { fontWeight: '600', color: colors.bodyText },
  textHint: {
    marginTop: sizes.padding,
    fontSize: 12,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
});
