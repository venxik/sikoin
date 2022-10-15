import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';

import {
  Button,
  DetailItemList,
  DetailItemProfileHeader,
  HeaderBack,
} from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../../../constants';
import { fetchBiodata } from '../../../../redux/reducers/BiodataReducer';
import { getFormattedDate } from '../../../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarBiodataMainScreen'>;

const DaftarBiodataMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { biodataData } = useAppSelector((s) => s.BiodataReducer) || {};
  const {
    agama,
    bank,
    golDarah,
    jenisKelamin,
    jumlahAnak,
    kewarganegaraan,
    noRek,
    pendidikanTerakhir,
    statusPernikahan,
    tanggalLahir,
    tempatLahir,
  } = biodataData;

  useEffect(() => {
    dispatch(fetchBiodata());
  }, []);

  const navigateToAddScreen = (update: boolean) => {
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
        }}
      >
        <View style={styles.cardContainer}>
          <DetailItemProfileHeader />
          <DetailItemList title={strings.tempat_lahir} content={tempatLahir} />
          <DetailItemList
            title={strings.tgl_lahir}
            content={!isEmpty(tanggalLahir) ? getFormattedDate(tanggalLahir) : ''}
          />
          <DetailItemList title={strings.jenis_kelamin} content={jenisKelamin} />
          <DetailItemList title={strings.golongan_darah} content={golDarah} />
          <DetailItemList title={strings.kewarganegaraan} content={kewarganegaraan} />
          <DetailItemList title={strings.pendidikan_terakhir} content={pendidikanTerakhir} />
          <DetailItemList title={strings.agama} content={agama} />
          <DetailItemList title={strings.status_pernikahan} content={statusPernikahan} />
          <DetailItemList title={strings.jumlah_anak} content={jumlahAnak?.toString()} />
          <DetailItemList title={strings.no_rekening} content={noRek} />
          <DetailItemList title={strings.bank} content={bank} />
          <Button
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
