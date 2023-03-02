import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import {
  CardLastItem,
  CardMarketLarge,
  HeaderBack,
  MenuHeaderIcon,
  Popup1Button,
  TextInputBorder,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, images, sizes, strings } from '../../constants';
import { fetchAddToFavorit, fetchMarketMainData } from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketMainScreen'>;

const MarketMainScreen: FC<Props> = ({ navigation }) => {
  const { marketMainData } = useAppSelector((state) => state.MarketReducer) || {};
  const dispatch = useAppDispatch();

  const [showPopupInfo, setShowPopupInfo] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const popupContent = useMemo(
    () =>
      `Pengelola aplikasi atau Koperasi dapat memiliki toko online milik sendiri. Koperasi dapat menjual produk-produk terbaik secara langsung kepada anggota. Produk-produk yang dijual oleh Koperasi akan muncul di Web dan aplikasi ${Config.KOPERASI_NAME}.\n\nSelamat berkoperasi! ☀️`,
    [],
  );

  useEffect(() => {
    dispatch(fetchMarketMainData());
  }, []);

  const navigateToCartScreen = () => {
    navigation.navigate('MarketCartScreen');
  };

  const navigateToPembelian = () => {
    navigation.navigate('MarketPesananMainScreen');
  };

  const navigateToDetailsScreen = (id: number) => {
    navigation.navigate('MarketProductDetailsScreen', { id });
  };

  const navigateToFavoritScreen = () => {
    navigation.navigate('MarketFavoriteScreen');
  };

  const onPressAddToFavorit = (idProduk: number) => {
    dispatch(fetchAddToFavorit(idProduk));
  };

  const renderHeaderIcon = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Image
            style={{
              width: sizes.padding * 1.2,
              height: sizes.padding * 1.2,
            }}
            source={icons.icon_more_menu}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              marginTop: 30,
            },
          }}
          optionsContainerStyle={styles.optionsContainer}
        >
          <MenuOption onSelect={navigateToFavoritScreen}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_favorit} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.favorit}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={navigateToCartScreen}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_keranjang} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.keranjang}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={navigateToPembelian}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_pesanan} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{'Pembelian'}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => setShowPopupInfo(true)}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={icons.icon_info_black} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.tentang_market}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const cardHeader = (title: string) => {
    return (
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.cardHeaderTitle}>{title}</Text>
        {/* <TouchableOpacity>
          <Image
            source={icons.arrow_right_circle_primary}
            style={styles.icon}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderMarketCard = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        {cardHeader(strings.terbaru)}
        <FlatList
          horizontal
          data={marketMainData?.produkTerbaru}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardMarketLarge
                item={item}
                onPress={() => navigateToDetailsScreen(item.id)}
                onPressWishlist={() => onPressAddToFavorit(item.id)}
                onPressBeli={() => navigateToDetailsScreen(item.id)}
              />
              {index === marketMainData?.produkTerbaru?.length - 1 && (
                <CardLastItem
                  icon={icons.icon_market_white}
                  onPress={() =>
                    navigation.navigate('MarketProductScreen', {
                      title: 'Semua Produk',
                      type: 'all',
                    })
                  }
                />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  // const renderPromoCard = () => {
  //   return (
  //     <View style={{ marginBottom: 40 }}>
  //       {cardHeader(strings.promo)}
  //       <FlatList
  //         horizontal
  //         data={promoDataList}
  //         showsHorizontalScrollIndicator={false}
  //         scrollEventThrottle={16}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={({ item }) => (
  //           <View style={{ marginTop: 20 }}>
  //             <CardPromo item={item} onPressSelengkapnya={() => console.warn(item)} />
  //           </View>
  //         )}
  //       />
  //     </View>
  //   );
  // };

  // const renderMarketCardSmall = () => {
  //   return (
  //     <View style={{ marginBottom: 40 }}>
  //       {cardHeader(strings.diskon)}
  //       <FlatList
  //         horizontal
  //         data={marketDataList}
  //         showsHorizontalScrollIndicator={false}
  //         scrollEventThrottle={16}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={({ item, index }) => (
  //           <View style={{ marginTop: 20, flexDirection: 'row' }}>
  //             <CardMarketSmall
  //               item={item}
  //               onPress={navigateToDetailsScreen}
  //               onPressWishlist={() => console.warn(item)}
  //               onPressVoucher={navigateToCartScreen}
  //             />
  //             {index === marketDataList.length - 1 && (
  //               <CardLastItem
  //                 customText={strings.kunjungi_toko}
  //                 style={{
  //                   width: SCREEN_WIDTH * 0.45,
  //                 }}
  //                 icon={icons.arrow_right}
  //                 onPress={() => console.warn(item)}
  //               />
  //             )}
  //           </View>
  //         )}
  //       />
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack rightIcon={renderHeaderIcon()} />
      <Popup1Button
        iconStyle={{ width: 150, height: 150, marginBottom: -sizes.padding }}
        contentText={popupContent}
        headerText={strings.market}
        showPopup={showPopupInfo}
        onPress={() => setShowPopupInfo(false)}
        headerImage={images.menu_market}
      />
      <ScrollView style={{ paddingHorizontal: sizes.padding }}>
        <MenuHeaderIcon menu={strings.market} />
        {/* TOP MENU */}
        <View style={styles.topMenuContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={styles.topMenuIconContainer}
              onPress={() => navigation.navigate('MarketCategoryScreen')}
            >
              <Image source={icons.icon_kategori} style={styles.topMenuIcon} resizeMode="contain" />
              <Text style={styles.textTopMenu}>{strings.kategori}</Text>
            </TouchableOpacity>
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
            addRightButton
            onPressButton={() =>
              navigation.navigate('MarketProductScreen', { title: searchValue, type: 'search' })
            }
          />
        </View>
        {renderMarketCard()}
        {/* {renderMarketCardSmall()} */}
        {/* {renderPromoCard()} */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default MarketMainScreen;

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
