import React, { FC, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardMarketSmall, HeaderBack } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, SCREEN_HEIGHT, sizes } from '../../constants';
import {
  fetchAddToFavorit,
  fetchMarketAllProduct,
  fetchSearchMarketProduct,
} from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketProductScreen'>;

const MarketProductScreen: FC<Props> = ({ navigation, route }) => {
  const { title, type } = route.params;
  const { marketProductData } = useAppSelector((state) => state.MarketReducer) || {};
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === 'all') dispatch(fetchMarketAllProduct());
    else if (type === 'search') dispatch(fetchSearchMarketProduct(title));
  }, []);

  const onPressAddToFavorit = (idProduk: number) => {
    dispatch(fetchAddToFavorit(idProduk));
  };

  const navigateToDetailsScreen = (id: number) => {
    navigation.navigate('MarketProductDetailsScreen', { id });
  };

  const renderMarketCard = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        <FlatList
          data={marketProductData?.produk}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
          )}
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
      <HeaderBack title={title} />
      {renderMarketCard()}
    </SafeAreaView>
  );
};
export default MarketProductScreen;

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
});
