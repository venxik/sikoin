import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
  Button,
  DetailItemList,
  DetailItemProfileHeader,
  HeaderBack,
} from '../../../../components';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppSelector } from '../../../../config/store/ReduxStore';
import { colors, icons, sizes, strings } from '../../../../constants';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarPekerjaanMainScreen'
>;

const DaftarPekerjaanMainScreen: React.FC<Props> = ({ navigation }) => {
  const { pekerjaanData } = useAppSelector(s => s.PekerjaanReducer) || {};
  const {
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    namaPerusahaan,
    alamatKantor,
    provinsiKota,
    jabatanTerakhir,
    noTelpKantor,
  } = pekerjaanData || {};

  const navigateToAddScreen = () => {
    navigation.navigate('DaftarPekerjaanAddScreen');
  };

  const renderPekerjaan = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}>
        <View style={styles.cardContainer}>
          <DetailItemProfileHeader />
          <DetailItemList
            title={strings.gaji_bulanan}
            content={
              gajiBulanan
                ? `Rp ${formatter.formatStringToCurrencyNumber(gajiBulanan)}`
                : ''
            }
          />
          <DetailItemList
            title={strings.masa_kerja}
            content={
              !isEmpty(masaKerjaTahun) && !isEmpty(masaKerjaBulan)
                ? `${masaKerjaTahun} Tahun ${masaKerjaBulan} Bulan`
                : ''
            }
          />
          <DetailItemList
            title={strings.gaji_pokok}
            content={
              gajiBulanan
                ? `Rp ${formatter.formatStringToCurrencyNumber(gajiBulanan)}`
                : ''
            }
          />
          <DetailItemList
            title={strings.nama_perusahaan}
            content={namaPerusahaan}
          />
          <DetailItemList
            title={strings.jabatan_terakhir}
            content={jabatanTerakhir}
          />
          <DetailItemList
            title={strings.alamat_kantor}
            content={alamatKantor}
          />
          <DetailItemList title={strings.no_telp} content={noTelpKantor} />
          <DetailItemList
            title={strings.provinsi_kota}
            content={provinsiKota}
          />
          <Button
            shadow={false}
            onPress={() => navigateToAddScreen()}
            text={strings.edit_pekerjaan}
            icon={icons.icon_edit_profile}
            iconLocation="right"
            buttonContainerStyle={{ backgroundColor: colors.tonalLightPrimary }}
            textStyle={{ color: colors.primary }}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.pekerjaan}
      />
      {renderPekerjaan()}
    </SafeAreaView>
  );
};
export default DaftarPekerjaanMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
  },
});
