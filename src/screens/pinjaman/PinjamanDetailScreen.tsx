import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { HeaderBack } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { Search } from 'react-native-iconly';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../config';
import {
  fetchPinjamanDisetujuiData,
  fetchPinjamanDitolakData,
} from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanDetailScreen'>;

const PinjamanDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, status } = route.params;

  const dispatch = useAppDispatch();
  const {
    nominal,
    nominalPinjamanDiterima,
    jenisPinjaman,
    lamaPinjaman,
    namaBankTujuan,
    nomorKtp,
    nomorRekeningBank,
    alasan,
    sisaAngsuran,
    totalAngsuran,
    totalAngsuranBunga,
    totalAngsuranPokok,
  } = useAppSelector(s => s.PinjamanReducer.pinjamanDetailData);

  useEffect(() => {
    if (status === 'DISETUJUI') dispatch(fetchPinjamanDisetujuiData(id));
    else dispatch(fetchPinjamanDitolakData(id));
  }, []);

  const navigateToRincian = () => {
    navigation.navigate('PinjamanRincianScreen');
  };

  const Item = (props: { title: string; content: string }) => {
    const { title, content } = props;
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={styles.textItemTitle}>{title}</Text>
        <Text style={styles.textItemContent}>{content}</Text>
      </View>
    );
  };

  const SimulasiPinjaman = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textItemTitle}>Simulasi Pinjaman</Text>
          <TouchableOpacity onPress={navigateToRincian}>
            <Search
              color={colors.primary}
              style={{ marginLeft: sizes.padding }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total Angsuran Pokok : '}
          </Text>
          <Text style={styles.textItemContent}>
            Rp. {formatter.formatNumberToCurreny(totalAngsuranPokok)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total Angsuran Bunga : '}
          </Text>
          <Text style={styles.textItemContent}>
            Rp. {formatter.formatNumberToCurreny(totalAngsuranBunga)}
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            height: 2,
            backgroundColor: colors.primary,
            marginTop: sizes.padding,
            marginBottom: 4,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total : '}
          </Text>
          <Text style={styles.textItemContent}>
            Rp. {formatter.formatNumberToCurreny(totalAngsuran)}
          </Text>
        </View>
      </View>
    );
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
            {formatter.formatNumberToCurreny(
              nominal ? nominal : nominalPinjamanDiterima,
            )}
          </Text>
          {/* <Item title="Nama Lengkap" content={} /> */}
          <Item title="Nama Bank Tujuan" content={namaBankTujuan} />
          <Item title="Nomor Rekening Bank" content={nomorRekeningBank} />
          <Item title="Nomor KTP" content={nomorKtp} />
          <Item title="Jenis Pinjaman" content={jenisPinjaman} />
          <Item title="Lama Pinjaman" content={lamaPinjaman.toString()} />
          {status !== 'DITOLAK' ? (
            <View>
              <SimulasiPinjaman />
              <Item
                title="Sisa Bulan Pembayaran"
                content={sisaAngsuran as string}
              />
            </View>
          ) : (
            <Item title="Alasan Ditolak" content={alasan as string} />
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
