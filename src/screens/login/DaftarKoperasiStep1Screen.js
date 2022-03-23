import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ButtonText,
  DropdownForm,
  HeaderBack,
  TextboxBorder,
} from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DaftarKoperasiStep1Screen = () => {
  const navigation = useNavigation();

  const [koperasiName, setKoperasiName] = useState(null);
  const [noAnggota, setNoAnggota] = useState(null);

  const onChangeKoperasiName = value => {
    setKoperasiName(value);
  };

  const onChangeNoAnggota = value => {
    setNoAnggota(value);
  };

  const navigateToStep2 = () => {
    navigation.navigate('DaftarKoperasiStep2Screen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      {/* TOP SIDE */}
      <View style={styles.topContainer}>
        <View style={styles.topInnerContainer}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.15}
            rotation={180}
            width={3}
            fill={2}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => <Text style={styles.textCircle}>1/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text style={styles.textTitle2}>
          {strings.daftar_koperasi_isi_data_title_1}
        </Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        <TextboxBorder
          value={koperasiName}
          onChangeText={e => onChangeKoperasiName(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_nama_koperasimu}
          icon={icons.icon_pencil_textbox}
        />
        <TextboxBorder
          style={{
            marginTop: sizes.padding / 2,
          }}
          value={noAnggota}
          onChangeText={e => onChangeNoAnggota(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_no_anggota}
          icon={icons.icon_number_textbox}
        />
        <DropdownForm
          // data={dropdownItems.genderItem}
          // onChange={value => onChange(value)}
          // value={value.value}
          maxHeight={120}
        />
      </View>

      <ButtonText
        onPress={navigateToStep2}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.selanjutnya}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      />
    </SafeAreaView>
  );
};
export default DaftarKoperasiStep1Screen;

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
    padding: sizes.padding,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  textCircle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.bodyText,
  },
});
