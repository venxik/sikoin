import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  DetailItemList,
  DetailItemProfileHeader,
  HeaderBack,
} from '../../../components';
import { colors, icons, sizes, strings } from '../../../constants';
import moment from 'moment';
import { isEmpty } from 'lodash';

const DaftarBiodataMainScreen = () => {
  const navigation = useNavigation();

  const { biodataData } = useSelector(s => s.BiodataReducer) || {};
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
    bank,
    noRek,
  } = biodataData || {};

  const navigateToAddScreen = update => {
    navigation.navigate('DaftarBiodataAddScreen', {
      update: update,
      data: biodataData,
    });
  };

  const renderBiodata = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}>
        <View style={styles.cardContainer}>
          <DetailItemProfileHeader />
          <DetailItemList title={strings.tempat_lahir} content={tempatLahir} />
          <DetailItemList
            title={strings.tgl_lahir}
            content={
              !isEmpty(tanggalLahir)
                ? moment(new Date(tanggalLahir)).format('DD/MM/YYYY')
                : ''
            }
          />
          <DetailItemList
            title={strings.jenis_kelamin}
            content={gender?.value}
          />
          <DetailItemList
            title={strings.golongan_darah}
            content={golDarah?.value}
          />
          <DetailItemList
            title={strings.kewarganegaraan}
            content={kewarganegaraan?.value}
          />
          <DetailItemList
            title={strings.pendidikan_terakhir}
            content={pendidikanTerakhir?.value}
          />
          <DetailItemList title={strings.agama} content={agama?.value} />
          <DetailItemList title={strings.bank} content={bank} />
          <DetailItemList title={strings.no_rekening} content={noRek} />
          <DetailItemList
            title={strings.status_pernikahan}
            content={statusPernikahan?.value}
          />
          <DetailItemList title={strings.jumlah_anak} content={jumlahAnak} />
          <DetailItemList
            title={strings.pekerjaan}
            content={pekerjaan?.value}
          />
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
            shadow={false}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.biodata} />
      {renderBiodata()}
    </SafeAreaView>
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
});