import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, SubmenuItemList } from '../../../components';
import { ProfileStackParamList } from '../../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../../constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DataDiriMainScreen'>;

const DataDiriMainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.data_diri} />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{strings.identitas_pekerjaan}</Text>
        <SubmenuItemList
          icon={icons.icon_daftar_alamat}
          title={strings.daftar_alamat}
          onPress={() => navigation.navigate('DaftarAlamatMainScreen')}
        />
        <SubmenuItemList
          icon={icons.icon_profile}
          title={strings.biodata}
          onPress={() => navigation.navigate('DaftarBiodataMainScreen')}
        />
        <SubmenuItemList
          icon={icons.icon_daftar_ktp}
          title={strings.ktp}
          onPress={() => navigation.navigate('DaftarKtpAddScreen')}
        />
        <SubmenuItemList
          icon={icons.icon_referensi_keluarga}
          title={strings.referensi_keluarga}
          onPress={() => navigation.navigate('DaftarRefKeluargaMainScreen')}
        />
        <SubmenuItemList
          icon={icons.icon_tanda_tangan}
          title={strings.dokumen_pendukung}
          onPress={() => navigation.navigate('DokumenPendukungMainScreen')}
        />
        <SubmenuItemList
          icon={icons.icon_pekerjaan}
          title={strings.pekerjaan}
          onPress={() => navigation.navigate('DaftarPekerjaanMainScreen')}
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
    fontFamily: 'Poppins-Bold',
    color: colors.bodyTextLightGrey,
    marginTop: sizes.padding,
  },
});
