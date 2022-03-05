import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  DetailItemList,
  HeaderBack,
  ListEmptyDataComponent,
  ProfilePicture,
} from '../../../components';
import { colors, icons, sizes, strings } from '../../../constants';

const DaftarBiodataMainScreen = () => {
  const navigation = useNavigation();

  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const { biodataData } = useSelector(s => s.BiodataReducer) || {};
  const { name } = useSelector(s => s.ProfileReducer.profileData) || {};
  const {
    tempatLahir,
    tanggalLahir,
    gender,
    golDarah,
    kewarganegaraan,
    pendidikanTerakhir,
    agama,
    statusPernikahan,
    jumlahAnak,
    pekerjaan,
    detailPekerjaan,
  } = biodataData || {};

  const navigateToAddScreen = update => {
    navigation.navigate('DaftarBiodataAddScreen', {
      update: update,
      data: biodataData,
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
        text={strings.tambah_biodata}
        onPress={navigateToAddScreen}
      />
    </View>
  );

  const renderBiodata = () => {
    return (
      <View style={styles.cardContainer}>
        <ProfilePicture disabled showKoperasi={false} />
        <Text style={styles.nameText}>{name}</Text>
        <DetailItemList
          title={strings.tmptTglLahir}
          content={tempatLahir.concat(', ' + tanggalLahir)}
        />
        <DetailItemList title={strings.gender} content={gender} />
        <DetailItemList title={strings.golongan_darah} content={golDarah} />
        <DetailItemList
          title={strings.kewarganegaraan}
          content={kewarganegaraan}
        />
        <DetailItemList
          title={strings.pendidikan_terakhir}
          content={pendidikanTerakhir}
        />
        <DetailItemList title={strings.agama} content={agama} />
        <DetailItemList
          title={strings.status_pernikahan}
          content={statusPernikahan}
        />
        <DetailItemList title={strings.jumlah_anak} content={jumlahAnak} />
        <DetailItemList title={strings.pekerjaan} content={pekerjaan} />
        <DetailItemList
          showBorder={false}
          title={strings.detail_pekerjaan}
          content={detailPekerjaan}
        />
        <ButtonText
          onPress={() => navigateToAddScreen(true)}
          text={strings.edit_biodata}
          icon={icons.icon_edit_profile}
          iconLocation="right"
          buttonContainerStyle={{ backgroundColor: colors.tonalLightPrimary }}
          textStyle={{ color: colors.primary }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.daftar_ktp}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}>
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
        {biodataData ? renderBiodata() : renderEmpty()}
      </ScrollView>
    </View>
  );
};
export default DaftarBiodataMainScreen;

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
  nameText: {
    marginBottom: 40,
    fontWeight: '700',
    fontSize: 24,
    color: colors.bodyText,
  },
});
