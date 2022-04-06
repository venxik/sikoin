import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
  Button,
  DetailItemList,
  DetailItemProfileHeader,
  HeaderBack,
} from '../../../../components';
import { colors, icons, sizes, strings } from '../../../../constants';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { fetchBiodata } from '../../../../redux/reducers/BiodataReducer';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarBiodataMainScreen'
>;

const DaftarBiodataMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { biodataData } = useAppSelector(s => s.BiodataReducer) || {};
  const {
    agama,
    bank,
    detail_pekerjaan,
    gol_darah,
    jenis_kelamin,
    jumlah_anak,
    kewarganegaraan,
    no_rek,
    pekerjaan,
    pendidikan_terakhir,
    status_pernkahan,
    tanggal_lahir,
    tempat_lahir,
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
        }}>
        <View style={styles.cardContainer}>
          <DetailItemProfileHeader />
          <DetailItemList title={strings.tempat_lahir} content={tempat_lahir} />
          <DetailItemList
            title={strings.tgl_lahir}
            content={
              !isEmpty(tanggal_lahir)
                ? moment(tanggal_lahir).format('DD/MM/YYYY')
                : ''
            }
          />
          <DetailItemList
            title={strings.jenis_kelamin}
            content={jenis_kelamin}
          />
          <DetailItemList title={strings.golongan_darah} content={gol_darah} />
          <DetailItemList
            title={strings.kewarganegaraan}
            content={kewarganegaraan}
          />
          <DetailItemList
            title={strings.pendidikan_terakhir}
            content={pendidikan_terakhir}
          />
          <DetailItemList title={strings.agama} content={agama} />
          <DetailItemList title={strings.bank} content={bank} />
          <DetailItemList title={strings.no_rekening} content={no_rek} />
          <DetailItemList
            title={strings.status_pernikahan}
            content={status_pernkahan}
          />
          <DetailItemList
            title={strings.jumlah_anak}
            content={jumlah_anak.toString()}
          />
          <DetailItemList title={strings.pekerjaan} content={pekerjaan} />
          <DetailItemList
            showBorder={false}
            title={strings.detail_pekerjaan}
            content={detail_pekerjaan}
          />
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
