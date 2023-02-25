import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ArrowRightSquare } from 'react-native-iconly';

import { colors, icons, sizes } from '../../constants';
import Button from '../Button';
import Popup1Button from '../Popup1Button';

const MarketPembelianItem = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  const onPressSelesai = () => {
    setShowPopup(true);
  };

  const navigateToDetail = () => {
    navigation.navigate('MarketPesananDetailScreen');
  };

  return (
    <View style={styles.container}>
      <Popup1Button
        headerText={'Anda akan menyelesaikan pemesanan'}
        contentText={
          'Pastikan barang yang Kamu terima sesuai dengan transaksi pembelian yang dilakukan'
        }
        showPopup={showPopup}
        onPress={() => setShowPopup(false)}
        headerImage={icons.icon_info_popup}
        customButtonText={'Selesai'}
      />
      <View style={styles.rowContainer}>
        <FastImage
          source={{ uri: 'https://picsum.photos/id/121/400/400' }}
          style={styles.imageStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>The North Face HYKE Season FW18</Text>
          <View style={styles.row}>
            <Text style={styles.textPrice}>Rp</Text>
            <View style={styles.dot} />
            <Text style={styles.textPrice}>5.600.000</Text>
          </View>
          <Text style={styles.textTime}>21 Jan 2022, 10:39 WIB</Text>
        </View>
        <TouchableOpacity style={{ marginTop: 12 }} onPress={navigateToDetail}>
          <ArrowRightSquare color={colors.primary} />
        </TouchableOpacity>
      </View>
      <Button
        onPress={onPressSelesai}
        text={'Selesai'}
        textStyle={{ fontSize: 10 }}
        buttonContainerStyle={{ width: '40%', marginVertical: 20 }}
        shadow={false}
      />
    </View>
  );
};

export default MarketPembelianItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bodyTextGrey,
    marginTop: sizes.padding,
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
