import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ArrowRightSquare } from 'react-native-iconly';

import { useAppDispatch } from '../../config';
import { colors, icons, sizes } from '../../constants';
import { fetchSetPurchaseDone } from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';
import Button from '../Button';
import Popup1Button from '../Popup1Button';
import { MarketPembelianItemProps } from './model';

const MarketPembelianItem = (props: MarketPembelianItemProps) => {
  const { item } = props;
  const { foto, nama, status, totalHarga, waktu, id } = item || {};
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [showPopup, setShowPopup] = useState(false);

  const onPressSelesai = () => {
    setShowPopup(true);
  };

  const onPressPopup = () => {
    dispatch(fetchSetPurchaseDone(id));
    setShowPopup(false);
  };

  const navigateToDetail = () => {
    navigation.navigate('MarketPesananDetailScreen', { id });
  };

  return (
    <View style={styles.container}>
      <Popup1Button
        headerText={'Anda akan menyelesaikan pemesanan'}
        contentText={
          'Pastikan barang yang Kamu terima sesuai dengan transaksi pembelian yang dilakukan'
        }
        showPopup={showPopup}
        onPress={onPressPopup}
        headerImage={icons.icon_info_popup}
        customButtonText={'Selesai'}
      />
      <View style={styles.rowContainer}>
        <FastImage source={{ uri: foto }} style={styles.imageStyle} />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{nama}</Text>
          <View style={styles.row}>
            <Text style={styles.textPrice}>Rp</Text>
            <View style={styles.dot} />
            <Text style={styles.textPrice}>{formatter.formatNumberToCurreny(totalHarga)}</Text>
          </View>
          <Text style={styles.textTime}>{waktu}</Text>
          <Text style={[styles.textTime, { color: colors.bodyText, marginTop: 10 }]}>{status}</Text>
        </View>
        <TouchableOpacity style={{ marginTop: 12 }} onPress={navigateToDetail}>
          <ArrowRightSquare color={colors.primary} />
        </TouchableOpacity>
      </View>
      {status.toLowerCase() === 'dikirim' && (
        <Button
          onPress={onPressSelesai}
          text={'Selesai'}
          textStyle={{ fontSize: 10 }}
          buttonContainerStyle={{ width: '40%', marginTop: 20 }}
          shadow={false}
        />
      )}
    </View>
  );
};

export default MarketPembelianItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bodyTextGrey,
    marginTop: sizes.padding,
    paddingVertical: sizes.padding,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes.padding * 0.3,
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: colors.bodyText,
    marginHorizontal: sizes.padding * 0.4,
  },
  textContainer: {
    marginLeft: sizes.padding / 2,
    width: '70%',
  },
  textName: {
    fontFamily: 'Poppins-Medium',
    color: colors.bodyText,
    fontSize: 15,
  },
  textPrice: {
    fontFamily: 'Poppins-Medium',
    color: colors.bodyTextGrey,
    fontSize: 16,
  },
  textTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.bodyTextLightGrey,
  },
});
