import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { HeaderBack, SubmenuListItem } from '../../components';
import { colors, icons, sizes, strings } from '../../constants';

const DataDiriMainScreen = () => {
  const navigation = useNavigation();
  const navigateToOtherScreen = screen => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.data_diri}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{strings.identitas_pekerjaan}</Text>
        <SubmenuListItem
          icon={icons.icon_daftar_alamat}
          title={strings.daftar_alamat}
          onPress={() => navigateToOtherScreen('DaftarAlamatMainScreen')}
        />
        <SubmenuListItem
          icon={icons.icon_profile}
          title={strings.biodata}
          onPress={() => navigateToOtherScreen('DaftarBiodataMainScreen')}
        />
        <SubmenuListItem
          icon={icons.icon_daftar_ktp}
          title={strings.ktp}
          onPress={() => navigateToOtherScreen('DaftarKtpMainScreen')}
        />
        <SubmenuListItem
          icon={icons.icon_referensi_keluarga}
          title={strings.referensi_keluarga}
          onPress={() => navigateToOtherScreen('DaftarRefKeluargaMainScreen')}
        />
        <SubmenuListItem
          icon={icons.icon_tanda_tangan}
          title={strings.tanda_tangan}
          onPress={() => navigateToOtherScreen('DaftarTtdMainScreen')}
        />
        <SubmenuListItem
          icon={icons.icon_pekerjaan}
          title={strings.pekerjaan}
          onPress={() => navigateToOtherScreen('DaftarPekerjaanMainScreen')}
        />
      </View>
    </SafeAreaView>
  );
};
export default DataDiriMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    marginHorizontal: sizes.padding,
    paddingBottom: sizes.padding,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.bodyTextLightGrey,
    marginTop: sizes.padding,
  },
});
