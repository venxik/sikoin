import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';

import { HeaderBack } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes } from '../../constants';
import { fetchPurchaseDetails } from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketPesananDetailScreen'>;

const MarketPesananDetailScreen = ({ route }: Props) => {
  const { id } = route.params;

  const { purchaseDetails } = useAppSelector((s) => s.MarketReducer);

  const { nama, nomorPesanan, status: statusPesanan, waktu } = purchaseDetails.pesanan;
  const { kurir, noResi } = purchaseDetails.infoPengiriman;
  const { biayaPengiriman, totalBayar, totalHarga } = purchaseDetails.rincianPembayaran;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPurchaseDetails(id));
  }, []);

  const copyToClipboard = (text?: string) => {
    Clipboard.setString(text ?? '');
    ToastAndroid.show('Text berhasil disalin', 2000);
  };

  const renderProducts = () =>
    purchaseDetails.detailProduk.map((item) => {
      const { fotoProduk, namaProduk, jumlah, hargaSatuan, hargaTotal, id: produkId } = item;
      return (
        <View
          key={produkId}
          style={{ flexDirection: 'row', marginHorizontal: sizes.padding, alignItems: 'center' }}
        >
          <FastImage source={{ uri: fotoProduk }} style={styles.imageProduct} />
          <View style={{ width: '80%', marginLeft: sizes.padding }}>
            <Text style={styles.textProductName}>{namaProduk}</Text>
            <Text style={styles.textProductQty}>{`${jumlah} x Rp ${formatter.formatNumberToCurreny(
              hargaSatuan,
            )}`}</Text>
            <Text style={styles.textProductTotal}>{`Total Rp ${formatter.formatNumberToCurreny(
              hargaTotal,
            )}`}</Text>
          </View>
        </View>
      );
    });

  return (
    <ScrollView style={styles.container}>
      <HeaderBack title={'Detail Pesanan'} textStyle={{ width: '100%' }} />
      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>{`Pesanan ${statusPesanan.toLowerCase()}`}</Text>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textContentHeader}>{nomorPesanan}</Text>
            {/* <TouchableOpacity onPress={() => copyToClipboard('test')}>
              <Image
                source={icons.icon_copy_outline}
                style={styles.iconCopy}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
          </View>
          {/* <Text style={styles.textTime}>{waktu}</Text> */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textContentHeader}>Nama Pembeli</Text>
          <Text style={styles.textContent}>{nama}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textContentHeader}>Tanggal Pembelian</Text>
          <Text style={styles.textContent}>{waktu}</Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Detail Produk</Text>
        {renderProducts()}
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Info Pengiriman</Text>
        <View style={styles.infoPengirimanContainer}>
          <Text style={styles.textInfoPengirimanLeft}>Kurir</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textInfoPengirimanRight}>{kurir.toUpperCase()}</Text>
            {/* <ArrowRightSquare color={colors.primary} style={{ marginLeft: 4 }} /> */}
          </TouchableOpacity>
        </View>
        {!isEmpty(noResi) && (
          <View style={styles.infoPengirimanContainer}>
            <Text style={styles.textInfoPengirimanLeft}>No. Resi</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => copyToClipboard('test')}
            >
              <Text style={[styles.textInfoPengirimanRight, { color: colors.bodyText }]}>
                {noResi}
              </Text>
              <Image
                source={icons.icon_copy_clipboard}
                style={styles.iconCopy}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={styles.infoPengirimanContainer}>
          <Text style={styles.textInfoPengirimanLeft}>Faktur</Text>
          <View>
            <Text style={[styles.textContentHeader, { color: colors.bodyTextLightGrey }]}>
              Jeo Ferli
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.textInfoPengirimanRight, { color: colors.bodyText }]}>
                Sudah Dicetak
              </Text>
              <ArrowRightSquare color={colors.primary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Rincian Pembayaran</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View style={styles.dot} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <Text style={styles.textContentHeader}>Total Harga</Text>
            <Text style={styles.textContent}>{`Rp ${formatter.formatNumberToCurreny(
              totalHarga,
            )}`}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View style={styles.dot} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Text
              style={[styles.textContentHeader, { width: '70%' }]}
            >{`Biaya Pengiriman ${kurir.toUpperCase()}`}</Text>
            <Text style={styles.textContent}>{`Rp ${formatter.formatNumberToCurreny(
              biayaPengiriman,
            )}`}</Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View style={styles.dot} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Text style={[styles.textContentHeader, { width: '70%' }]}>
              Biaya Asuransi Pengiriman
            </Text>
            <Text style={styles.textContent}>Rp. 12.000</Text>
          </View>
        </View> */}
        <View style={styles.dottedLines} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={[styles.textContentHeader, { fontFamily: 'Inter-Bold' }]}>Total Bayar</Text>
          <Text
            style={[styles.textContent, { fontFamily: 'Inter-Bold' }]}
          >{`Rp ${formatter.formatNumberToCurreny(totalBayar)}`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MarketPesananDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconCopy: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  imageProduct: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  innerContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: sizes.padding,
  },
  textSectionHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: colors.bodyTextGrey,
    marginBottom: sizes.padding,
  },
  textContentHeader: {
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  textContent: {
    color: colors.bodyText,
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  textTime: {
    color: colors.bodyTextLightGrey,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  textContainer: {
    marginBottom: 16,
  },
  textProductName: {
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  textProductQty: {
    color: colors.bodyText,
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  textProductTotal: {
    color: colors.bodyTextGrey,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  infoPengirimanContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '80%',
  },
  textInfoPengirimanLeft: {
    width: '30%',
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  textInfoPengirimanRight: {
    color: colors.bodyText,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: colors.bodyText,
    marginHorizontal: sizes.padding * 0.4,
  },
  dottedLines: {
    width: '100%',
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    borderBottomColor: colors.bodyTextGrey,
  },
});
