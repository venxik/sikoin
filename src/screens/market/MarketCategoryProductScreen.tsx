import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CardMarketSmall, HeaderBack, TextInputBorder } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes } from '../../constants';
import {
  fetchAddToFavorit,
  fetchCategoryProductData,
  ProductData,
} from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCategoryProductScreen'>;

const MarketCategoryProductScreen: FC<Props> = ({ navigation, route }) => {
  const { nama } = route.params;
  const { marketProductData } = useAppSelector((state) => state.MarketReducer) || {};
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');

  const data = useMemo(() => {
    if (search.length > 3) {
      return marketProductData.produk.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return marketProductData.produk;
  }, [search, marketProductData]);

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      setSearch(value);
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
    dispatch(fetchCategoryProductData(4));
  }, []);

  const onPressAddToFavorit = (idProduk: number) => {
    dispatch(fetchAddToFavorit(idProduk));
  };

  const navigateToDetailsScreen = (productId: number) => {
    navigation.navigate('MarketProductDetailsScreen', { id: productId });
  };

  const { control } = useForm<{ searchValue: string }>({
    defaultValues: {
      searchValue: '',
    },
  });

  const renderHeaderIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MarketCartScreen')}>
        <Image
          style={{
            width: sizes.padding * 1.2,
            height: sizes.padding * 1.2,
          }}
          source={icons.icon_cart}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: ProductData }) => {
      return (
        <View
          style={{
            alignItems: 'center',
            width: '50%',
          }}
        >
          <CardMarketSmall
            item={item}
            onPress={() => navigateToDetailsScreen(item.id)}
            onPressWishlist={() => onPressAddToFavorit(item.id)}
            style={{
              marginBottom: sizes.padding,
            }}
            imageHeight={SCREEN_HEIGHT * 0.25}
          />
        </View>
      );
    },
    [navigateToDetailsScreen, onPressAddToFavorit],
  );

  const renderBody = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          ListEmptyComponent={
            !isLoading ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: SCREEN_HEIGHT * 0.4,
                }}
              >
                <Text
                  style={{
                    color: colors.bodyText,
                    fontFamily: 'Poppins-Medium',
                  }}
                >
                  Data Kosong
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={nama} rightIcon={renderHeaderIcon()} />
      <View style={styles.innerContainer}>
        <Controller
          control={control}
          name="searchValue"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              value={value}
              onChangeText={(e) => {
                onChangeText(e);
                onChange(e);
              }}
              placeholder={'Cari Produk'}
              icon={icons.icon_search_market}
            />
          )}
        />
      </View>
      {renderBody()}
    </SafeAreaView>
  );
};
export default MarketCategoryProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    padding: sizes.padding / 2,
    borderRadius: sizes.padding / 1.5,
    width: '45%',
  },
  popupMenuIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textPopupMenu: {
    marginLeft: 10,
    width: '65%',
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  popupContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.strokeGrey,
    paddingBottom: 10,
  },
  topMenuContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginTop: sizes.padding,
    marginBottom: 40,
  },
  topMenuIconContainer: { width: '30%', alignItems: 'center' },
  topMenuIcon: {
    width: 50,
    height: 50,
  },
  textTopMenu: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cardHeaderTitle: {
    fontSize: 17,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
    marginRight: 20,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  innerContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginBottom: sizes.padding,
    marginHorizontal: sizes.padding,
  },
});
