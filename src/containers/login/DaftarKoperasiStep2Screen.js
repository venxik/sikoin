import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonText, HeaderBack, TextboxBorder } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DaftarKoperasiStep2Screen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);

  const onChangeEmail = value => {
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
            {() => <Text style={{ fontWeight: 'bold' }}>2/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text style={{ marginTop: 16, color: colors.black }}>
          {strings.daftar_koperasi_isi_data_title_2}
        </Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        <TextboxBorder
          value={email}
          onChangeText={e => onChangeEmail(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_nama_koperasimu}
          icon={icons.icon_email}
        />
        <Text style={{ marginTop: sizes.padding, fontSize: 12 }}>
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
    fontSize: sizes.padding,
    fontWeight: 'bold',
    color: colors.bodyText,
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
});
