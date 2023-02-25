import React from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightSquare } from 'react-native-iconly';

import { HeaderBack } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCheckoutScreen'>;

const MarketCheckoutScreen = ({}: Props) => {
  const copyToClipboard = (text?: string) => {
    Clipboard.setString(text ?? '');
    ToastAndroid.show('Text berhasil disalin', 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBack title={'Detail Pesanan'} textStyle={{ width: '100%' }} />
      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Pesanan Selesai</Text>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textContentHeader}>INV/20220115/MPL/1951204385</Text>
            <TouchableOpacity onPress={() => copyToClipboard('test')}>
              <Image
                source={icons.icon_copy_outline}
                style={styles.iconCopy}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.textTime}>21 Jan 2022, 10:39 WIB</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textContentHeader}>Nama Pembeli</Text>
          <Text style={styles.textContent}>Jeo Ferli</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textContentHeader}>Tanggal Pembelian</Text>
          <Text style={styles.textContent}>20 Jan 2022, 21:06 WIB</Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Detail Produk</Text>
        <View
          style={{ flexDirection: 'row', marginHorizontal: sizes.padding, alignItems: 'center' }}
        >
          <FastImage
            source={{ uri: 'https://picsum.photos/id/121/400/400' }}
            style={styles.imageProduct}
          />
          <View style={{ width: '80%', marginLeft: sizes.padding }}>
            <Text style={styles.textProductName}>The North Face HYKE Season FW18</Text>
            <Text style={styles.textProductQty}>1 x Rp 5.600.000</Text>
            <Text style={styles.textProductTotal}>Total: Rp 5.600.000</Text>
          </View>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.textSectionHeader}>Info Pengiriman</Text>
        <View style={styles.infoPengirimanContainer}>
          <Text style={styles.textInfoPengirimanLeft}>Kurir</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textInfoPengirimanRight}>Instant Courier - GoSend</Text>
            <ArrowRightSquare color={colors.primary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoPengirimanContainer}>
          <Text style={styles.textInfoPengirimanLeft}>No. Resi</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => copyToClipboard('test')}
          >
            <Text style={[styles.textInfoPengirimanRight, { color: colors.bodyText }]}>
              36547787908659
            </Text>
            <Image
              source={icons.icon_copy_clipboard}
              style={styles.iconCopy}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoPengirimanContainer}>
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
        </View>
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
            <Text style={styles.textContent}>Rp. 5.645.700</Text>
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
            <Text style={styles.textContentHeader}>Biaya Pengiriman JNE</Text>
            <Text style={styles.textContent}>Rp. 33.000</Text>
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
            <Text style={[styles.textContentHeader, { width: '70%' }]}>
              Biaya Asuransi Pengiriman
            </Text>
            <Text style={styles.textContent}>Rp. 12.000</Text>
          </View>
        </View>
        <View style={styles.dottedLines} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={[styles.textContentHeader, { fontFamily: 'Inter-Bold' }]}>Total Bayar</Text>
          <Text style={[styles.textContent, { fontFamily: 'Inter-Bold' }]}>Rp. 5.600.000</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MarketCheckoutScreen;

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
  },
  textInfoPengirimanLeft: {
    width: '30%',
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  textInfoPengirimanRight: {
    color: colors.primary,
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
