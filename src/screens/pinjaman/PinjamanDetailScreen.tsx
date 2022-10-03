import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { HeaderBack, PinjamanDetailItem } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../config';
import {
  fetchPinjamanDisetujuiData,
  fetchPinjamanDitolakData,
} from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';
import PinjamanSimulasiSection from '../../components/PinjamanSimulasiSection';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanDetailScreen'>;

const PinjamanDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, status } = route.params;

  const dispatch = useAppDispatch();
  const {
    nama,
    nominal,
    jenisPinjaman,
    lamaPinjaman,
    namaBankTujuan,
    noKtp,
    nomorRekeningBank,
    alasan,
    sisaAngsuran,
    totalAngsuran,
    totalAngsuranBunga,
    totalAngsuranPokok,
  } = useAppSelector(s => s.PinjamanReducer.pinjamanDetailData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (status === 'DISETUJUI') dispatch(fetchPinjamanDisetujuiData(id));
    else dispatch(fetchPinjamanDitolakData(id));
  };

  const navigateToRincian = () => {
    navigation.navigate('PinjamanRincianScreen', { id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.kembali} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: sizes.padding,
        }}>
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Total Jumlah Pinjaman</Text>
          <Text style={styles.textSubtitle}>
            {'Rp. '}
            {formatter.formatNumberToCurreny(nominal)}
          </Text>
          <PinjamanDetailItem title="Nama Lengkap" content={nama} />
          <PinjamanDetailItem
            title="Nama Bank Tujuan"
            content={namaBankTujuan}
          />
          <PinjamanDetailItem
            title="Nomor Rekening Bank"
            content={nomorRekeningBank}
          />
          <PinjamanDetailItem title="Nomor KTP" content={noKtp} />
          <PinjamanDetailItem title="Jenis Pinjaman" content={jenisPinjaman} />
          <PinjamanDetailItem
            title="Lama Pinjaman"
            content={lamaPinjaman.toString()}
          />
          {status !== 'DITOLAK' ? (
            <View>
              <PinjamanSimulasiSection
                onPress={navigateToRincian}
                item={{
                  totalAngsuran: totalAngsuran as number,
                  totalAngsuranBunga: totalAngsuranBunga as number,
                  totalAngsuranPokok: totalAngsuranPokok as number,
                }}
              />
              <PinjamanDetailItem
                title="Cicilan Terbayar"
                content={sisaAngsuran}
              />
            </View>
          ) : (
            <PinjamanDetailItem
              title="Alasan Ditolak"
              content={alasan as string}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PinjamanDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyTextGrey,
  },
  textSubtitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: colors.bodyTextGrey,
    fontSize: 24,
  },
  textItemTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyText,
    fontWeight: '600',
  },
  textItemContent: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
  },
});
