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
import { fetchPekerjaan } from '../../../../redux/reducers/PekerjaanReducer';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarPekerjaanMainScreen'>;

const DaftarPekerjaanMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { pekerjaanData } = useAppSelector((s) => s.PekerjaanReducer) || {};
  const {
    pekerjaan,
    detailPekerjaan,
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    namaPerusahaan,
    alamatKantor,
    provinsi,
  } = pekerjaanData || {};

  const navigateToAddScreen = () => {
    navigation.navigate('DaftarPekerjaanAddScreen');
  };

  useEffect(() => {
    dispatch(fetchPekerjaan());
  }, []);

  const renderPekerjaan = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}
      >
        <View style={styles.cardContainer}>
          <DetailItemProfileHeader />
          <DetailItemList title={strings.pekerjaan} content={pekerjaan} />
          <DetailItemList title={strings.detail_pekerjaan} content={detailPekerjaan} />
          <DetailItemList title={strings.nama_perusahaan} content={namaPerusahaan} />
          <DetailItemList
            title={strings.masa_kerja}
            content={
              !isEmpty(masaKerjaTahun) && !isEmpty(masaKerjaBulan)
                ? `${masaKerjaTahun} Tahun ${masaKerjaBulan} Bulan`
                : ''
            }
          />
          <DetailItemList
            title={strings.gaji_penghasilan_bulanan}
            content={gajiBulanan ? `Rp ${formatter.formatStringToCurrencyNumber(gajiBulanan)}` : ''}
          />
          <DetailItemList title={strings.alamat_kantor} content={alamatKantor} />
          <DetailItemList title={strings.provinsi_kota} content={provinsi} />
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
      <HeaderBack onPress={() => navigation.goBack()} title={strings.pekerjaan} />
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
