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
      <View
        style={{
          backgroundColor: colors.tonalLightPrimary,
          borderRadius: sizes.padding,
          marginHorizontal: SCREEN_WIDTH * 0.05,
          padding: SCREEN_WIDTH * 0.05,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.13}
            rotation={180}
            width={3}
            fill={2}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => <Text style={{ fontWeight: 'bold' }}>1/2</Text>}
          </AnimatedCircularProgress>
          <Text
            style={{
              marginLeft: 16,
              fontSize: sizes.padding,
              fontWeight: 'bold',
              color: colors.black,
            }}>
            {strings.isi_data}
          </Text>
        </View>
        <Text style={{ marginTop: 16, color: colors.black }}>
          {strings.daftar_koperasi_isi_data_title_1}
        </Text>
      </View>
      {/* BOTTOM SIDE */}
      <View
        style={{
          marginTop: 16,
          backgroundColor: colors.white,
          borderRadius: sizes.padding,
          margin: SCREEN_WIDTH * 0.05,
          padding: SCREEN_WIDTH * 0.05,
        }}>
        <TextboxBorder
          value={koperasiName}
          onChangeText={e => onChangeKoperasiName(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_nama_koperasimu}
          icon={icons.icon_pencil_textbox}
        />
        <TextboxBorder
          style={{
            marginTop: sizes.padding,
          }}
          value={noAnggota}
          onChangeText={e => onChangeNoAnggota(e)}
          secureTextEntry={false}
          placeholder={strings.masukan_no_anggota}
          icon={icons.icon_number_textbox}
        />
        <DropdownForm
          customText={strings.pilih_tgl_lahir}
          style={{ marginTop: sizes.padding }}
        />
      </View>

      <ButtonText
        onPress={navigateToStep2}
        buttonContainerStyle={{
          position: 'absolute',
          bottom: sizes.padding,
          width: '90%',
          marginHorizontal: SCREEN_WIDTH * 0.05,
        }}
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
    // width: '100%',
    height: '100%',
  },
});
