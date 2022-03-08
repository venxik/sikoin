import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  DetailItemList,
  DetailItemListHeader,
  HeaderBack,
  ListEmptyDataComponent,
} from '../../../components';
import { colors, icons, sizes, strings } from '../../../constants';
import { formatter } from '../../../utils';

const DaftarPekerjaanMainScreen = () => {
  const navigation = useNavigation();

  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const { pekerjaanData } = useSelector(s => s.PekerjaanReducer) || {};
  const {
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    bank,
    noRekening,
    namaPerusahaan,
    alamatKantor,
    provinsiKota,
  } = pekerjaanData || {};

  const navigateToAddScreen = update => {
    navigation.navigate('DaftarPekerjaanAddScreen', {
      update: update,
      data: pekerjaanData,
    });
  };

  // const deleteKeluarga = item => {
  //   setShowDeletePopup(true);
  //   setSelectKeluarga(item);
  // };

  // const confirmDeleteAlamat = () => {
  //   dispatch(deleteKelFromReducer(selectKeluarga));
  //   setShowDeletePopup(false);
  //   setSuccessShowDeletePopup(true);
  // };

  const renderEmpty = () => (
    <View style={{ flex: 1 }}>
      <ListEmptyDataComponent
        text={strings.tambah_kepegawaian}
        onPress={() => navigateToAddScreen(false)}
      />
    </View>
  );

  const renderPekerjaan = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}>
        <View style={styles.cardContainer}>
          <DetailItemListHeader />
          <DetailItemList
            title={strings.gaji_bulanan}
            content={`Rp ${formatter.formatStringToCurrencyNumber(
              gajiBulanan,
            )}`}
          />
          <DetailItemList
            title={strings.masa_kerja}
            content={`${masaKerjaTahun} Tahun ${masaKerjaBulan} Bulan`}
          />
          <DetailItemList
            title={strings.gaji_pokok}
            content={`Rp ${gajiBulanan}`}
          />
          <DetailItemList
            title={strings.rekening}
            content={`${bank}\n${noRekening}`}
          />
          <DetailItemList
            title={strings.nama_perusahaan}
            content={namaPerusahaan}
          />
          <DetailItemList
            title={strings.alamat_kantor}
            content={alamatKantor}
          />
          <DetailItemList
            title={strings.provinsi_kota}
            content={provinsiKota}
          />
          <ButtonText
            onPress={() => navigateToAddScreen(true)}
            text={strings.edit_kepegawaian}
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
    <View style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.kepegawaian}
      />

      {/* <Popup2Button
        buttonLeftOnPress={() => setShowDeletePopup(false)}
        buttonRightOnPress={() => confirmDeleteAlamat()}
        buttonLeftTitle={strings.tidak_jadi}
        buttonRightTitle={strings.hapus}
        headerText={strings.yakin_hapus_alamat}
        showPopup={showDeletePopup}
        headerImage={icons.icon_info_popup}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      />
      <Popup1Button
        headerText={strings.sukses_hapus_alamat}
        showPopup={showSuccessDeletePopup}
        onPress={() => setSuccessShowDeletePopup(false)}
        headerImage={icons.popup_success}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      /> */}
      {pekerjaanData ? renderPekerjaan() : renderEmpty()}
    </View>
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
