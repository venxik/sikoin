import React, { FC } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardMarketSmall, HeaderBack } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, SCREEN_HEIGHT, sizes } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketItemListScreen'>;

const MarketItemListScreen: FC<Props> = ({ navigation }) => {
  const { marketDataList } = useAppSelector((state) => state.MarketReducer) || {};

  const navigateToDetailsScreen = () => {
    navigation.navigate('MarketItemDetailsScreen');
  };

  const renderMarketCard = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        <FlatList
          data={marketDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardMarketSmall
              item={item}
              onPress={navigateToDetailsScreen}
              onPressWishlist={() => console.warn(item)}
              style={{ flex: 1, marginBottom: sizes.padding }}
              imageHeight={SCREEN_HEIGHT * 0.25}
            />
          )}
          contentContainerStyle={{ paddingLeft: sizes.padding }}
          numColumns={2}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      {/* <MenuHeaderIcon menu={strings.market} /> */}
      {/* TOP MENU */}
      {/* <View style={styles.topMenuContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.topMenuIconContainer}>
              <Image source={icons.icon_kategori} style={styles.topMenuIcon} resizeMode="contain" />
              <Text style={styles.textTopMenu}>{strings.kategori}</Text>
            </View>
            <TouchableOpacity style={styles.topMenuIconContainer} onPress={navigateToCartScreen}>
              <Image
                source={icons.icon_keranjang_primary}
                style={styles.topMenuIcon}
                resizeMode="contain"
              />
              <Text style={styles.textTopMenu}>{'Keranjang'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuIconContainer} onPress={navigateToPembelian}>
              <Image
                source={icons.icon_pembelian}
                style={styles.topMenuIcon}
                resizeMode="contain"
              />
              <Text style={styles.textTopMenu}>{'Pembelian'}</Text>
            </TouchableOpacity>
          </View>
          <TextInputBorder
            style={{ marginTop: 10 }}
            value={searchValue}
            onChangeText={(e) => setSearchValue(e)}
            placeholder={strings.search_market_placeholder}
            icon={icons.icon_search_market}
          />
        </View> */}
      {renderMarketCard()}
      {/* {renderMarketCardSmall()} */}
      {/* {renderPromoCard()} */}
    </SafeAreaView>
  );
};
export default MarketItemListScreen;

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
