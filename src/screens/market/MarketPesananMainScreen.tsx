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
  const [flatListData, setFlatListData] = useState<PurchaseData[]>();

  useEffect(() => {
    if (purchaseData) setFlatListData(purchaseData);
  }, [purchaseData]);

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      const temp = purchaseData.filter((x) => x.nama.toLowerCase().includes(value.toLowerCase()));
      setFlatListData(temp);
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
      <View style={styles.topContainer}>
        <TextInputBorder
          value={searchValue}
          onChangeText={(e) => {
            onChangeText(e);
            setSearchValue(e);
          }}
          placeholder={'Cari Produk'}
          icon={icons.icon_search_market}
        />
      </View>
      <FlatList data={flatListData} renderItem={renderItem} style={styles.bottomContainer} />
    </View>
  );
};

export default MarketPesananMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    paddingTop: sizes.padding,
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
    marginTop: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    paddingBottom: sizes.padding,
    marginHorizontal: sizes.padding,
    borderBottomLeftRadius: sizes.padding,
    borderBottomRightRadius: sizes.padding,
  },
});
