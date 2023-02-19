import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, MarketPembelianItem, TextInputBorder } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketPesananMainScreen'>;

const MarketPesananMainScreen = ({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <View style={styles.container}>
      <HeaderBack title={'Transaksi'} textStyle={{ width: '100%' }} />
      <View style={styles.innerContainer}>
        <TextInputBorder
          value={searchValue}
          onChangeText={(e) => setSearchValue(e)}
          placeholder={'Cari Produk'}
          icon={icons.icon_search_market}
        />
        <MarketPembelianItem />
      </View>
    </View>
  );
};

export default MarketPesananMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginTop: sizes.padding,
    marginHorizontal: sizes.padding,
  },
});
