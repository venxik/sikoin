import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';

import { HeaderBack, MarketPembelianItem, TextInputBorder } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes } from '../../constants';
import { fetchPurchaseData, PurchaseData } from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketPesananMainScreen'>;

const MarketPesananMainScreen = ({}: Props) => {
  const { purchaseData } = useAppSelector((s) => s.MarketReducer);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      console.warn(value);
    }, 300),
    [],
  );

  const onChangeText = (e: string) => {
    handleSearch(e);
  };

  React.useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  useEffect(() => {
    dispatch(fetchPurchaseData());
  }, []);

  const renderItem = ({ item }: { item: PurchaseData }) => {
    return <MarketPembelianItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={'Transaksi'} textStyle={{ width: '100%' }} />
      <View style={styles.innerContainer}>
        <TextInputBorder
          value={searchValue}
          onChangeText={(e) => {
            onChangeText(e);
            setSearchValue(e);
          }}
          placeholder={'Cari Produk'}
          icon={icons.icon_search_market}
        />
        <FlatList data={purchaseData} renderItem={renderItem} />
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
