/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { Heart } from 'react-native-iconly';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { Button, FilterVariasi, HeaderBack, Popup2Button, QtyButton } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH, sizes, strings } from '../../constants';
import {
  fetchAddToCart,
  fetchAddToFavorit,
  fetchMarketProductDetails,
  setShowPopupAddToCartStatus,
} from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketProductDetailsScreen'>;
const dotSize = 6;
// const tab = ['Deskripsi', 'Ulasan', 'Diskusi'];

const MarketProductDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id: productId } = route.params;
  const { marketProductDetails, showPopupAddToCart } = useAppSelector((s) => s.MarketReducer);
  const dispatch = useAppDispatch();
  const {
    deskripsi,
    isKondisiBaru,
    nama,
    fotoProduk,
    harga,
    stok,
    variasiPertama,
    variasiKedua,
    kategori,
    isFavorit,
  } = marketProductDetails;
  const { nama: namaVariasiPertama, pilihan: pilihanVariasiPertama } = variasiPertama;
  const { nama: namaVariasiKedua, pilihan: pilihanVariasiKedua } = variasiKedua;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '85%'], []);
  // eslint-disable-next-line no-unused-vars
  const [selectedVariasiPertama, setSelectedVariasiPertama] = useState<string>('');
  // eslint-disable-next-line no-unused-vars
  const [selectedVariasiKedua, setSelectedVariasiKedua] = useState<string>('');
  const [qtyValue, setQtyValue] = useState<number>(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopupAddToCart === 'success') {
      setShowPopup(true);
      dispatch(setShowPopupAddToCartStatus('idle'));
    }
  }, [showPopupAddToCart]);

  useEffect(() => {
    dispatch(fetchMarketProductDetails(productId));
  }, []);

  const navigateToCartScreen = () => {
    navigation.push('MarketCartScreen');
    if (showPopup) setShowPopup(false);
  };

  const onPressMinusQty = () => {
    if (qtyValue > 1) {
      setQtyValue((prevValue) => (prevValue -= 1));
    }
  };

  const onPressPlusQty = () => {
    setQtyValue((prevValue) => (prevValue += 1));
  };

  const onPressAddToCart = ({ catatan }: { catatan: string }) => {
    dispatch(
      fetchAddToCart({
        jumlah: qtyValue,
        produkId: productId,
        variasiPertama: selectedVariasiPertama,
        variasiKedua: selectedVariasiKedua,
        catatan,
      }),
    );
    sheetRef.current?.close();
  };

  const onPressAddToFavorit = () => {
    dispatch(fetchAddToFavorit(productId));
  };

  const renderPopupMenu = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Image style={styles.iconHeader} source={icons.icon_more_menu} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.optionsContainer}>
          <MenuOption
            onSelect={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              })
            }
          >
            <View style={styles.popupContainer}>
              <Image source={icons.icon_home_outline} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.kembali_ke_beranda}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('Laporkan Produk')}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_info_outline} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.laporkan_produk}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('Pusat Bantuan')}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={icons.icon_pusat_bantuan} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.pusat_bantuan}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const renderRightButtonHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={navigateToCartScreen}>
          <Image
            source={icons.icon_cart}
            style={[styles.iconHeader, { marginRight: sizes.padding }]}
          />
        </TouchableOpacity>
        {renderPopupMenu()}
      </View>
    );
  };

  const renderPhotosIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {fotoProduk.map((_, index) => {
          return (
            <View
              style={[
                styles.dot,
                {
                  width: currentImgIndex === index ? 50 : 10,
                  backgroundColor:
                    currentImgIndex === index ? colors.bodyText : colors.bodyTextGrey,
                },
              ]}
              key={`dot-${index}`}
            />
          );
        })}
      </View>
    );
  };

  const renderPhotos = () => {
    if (fotoProduk && fotoProduk.length > 0)
      return (
        <View>
          <FlatList
            horizontal
            pagingEnabled
            decelerationRate={0}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            data={fotoProduk}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const index = (x / SCREEN_WIDTH).toFixed(0);
              setCurrentImgIndex(parseInt(index));
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.photosContainer}>
                <Image source={{ uri: item }} resizeMode="cover" style={styles.photos} />
              </View>
            )}
          />
          <View style={styles.dotMainContainer}>{renderPhotosIndicator()}</View>
        </View>
      );
    return null;
  };

  const renderDetailsItem = (
    icon: ImageSourcePropType,
    item: string | number,
    title: string,
    style?: ViewStyle,
  ) => {
    return (
      <View
        style={[
          {
            paddingVertical: sizes.padding,
            // paddingHorizontal: sizes.padding * 1.5,
          },
          style,
        ]}
      >
        <Text style={styles.textDetailsTitle}>{title}</Text>
        <View style={styles.row}>
          <Image source={icon} style={styles.iconDetails} />
          <Text style={styles.textDetailsItem}>{item}</Text>
        </View>
      </View>
    );
  };

  const renderDetails = () => {
    // return (
    //   <ScrollView
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //     contentContainerStyle={{ alignItems: 'center' }}
    //     style={{
    //       marginTop: sizes.padding,
    //       borderBottomColor: colors.strokeGrey,
    //       borderBottomWidth: 1,
    //     }}
    //   >
    //     {renderDetailsItem(icons.icon_terjual, terjual, strings.terjual, {
    //       paddingLeft: 0,
    //     })}
    //     <View style={styles.verticalLine} />
    //     {renderDetailsItem(icons.icon_kondisi, kondisi, strings.kondisi)}
    //     <View style={styles.verticalLine} />
    //     {renderDetailsItem(icons.icon_rating, rating, strings.rating)}
    //     <View style={styles.verticalLine} />
    //     {renderDetailsItem(icons.icon_berat, berat, strings.berat, {
    //       paddingRight: 0,
    //     })}
    //   </ScrollView>
    // );
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: sizes.padding,
          borderBottomColor: colors.strokeGrey,
          borderBottomWidth: 1,
        }}
      >
        {renderDetailsItem(icons.icon_kondisi, isKondisiBaru ? 'Baru' : 'Bekas', strings.kondisi, {
          width: '50%',
        })}
        {renderDetailsItem(icons.icon_berat, 100, 'Stock', {
          width: '50%',
        })}
      </View>
    );
  };

  const renderDescItem = (title: string, item: string | string[]) => {
    const ifString = () => {
      if (typeof item === 'string') {
        return <Text style={styles.textDescItem}>{item}</Text>;
      }
      return (
        <View style={styles.row}>
          {item.map((value, i) => (
            <Text key={i} style={styles.textDescItem}>
              {`${value}${i !== item.length - 1 ? ', ' : ''}`}
            </Text>
          ))}
        </View>
      );
    };
    return (
      <View
        style={{
          borderBottomColor: colors.strokeGrey,
          borderBottomWidth: 1,
          paddingBottom: 6,
          marginBottom: 10,
        }}
      >
        <Text style={styles.textDetailsTitle}>{title}</Text>
        {ifString()}
      </View>
    );
  };

  const { control, handleSubmit } = useForm<{ catatan: string }>({
    defaultValues: {
      catatan: '',
    },
  });

  const renderDescDetails = () => {
    return (
      <View style={{ marginTop: sizes.padding * 1.5 }}>
        <Text style={[styles.textDesc, { marginBottom: 40 }]}>{deskripsi}</Text>
        {renderDescItem('Kategori', kategori)}
        {namaVariasiPertama && renderDescItem(namaVariasiPertama, pilihanVariasiPertama)}
        {namaVariasiKedua && renderDescItem(namaVariasiKedua, pilihanVariasiKedua)}
        {/* <TouchableOpacity
          style={[
            styles.row,
            {
              padding: sizes.padding * 1.5,
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={styles.row}>
            <Image source={{ uri: logoToko }} style={styles.logoToko} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.textDescItem}>{namaToko}</Text>
              <Text style={[styles.textDesc, { color: colors.bodyTextLightGrey }]}>
                {lokasiToko}
              </Text>
            </View>
          </View>
          <Image source={icons.arrow_right_primary} style={styles.iconHeader} />
        </TouchableOpacity> */}
      </View>
    );
  };

  // const cardHeader = (title: string) => {
  //   return (
  //     <View style={styles.cardHeaderContainer}>
  //       <Text style={[styles.cardHeaderTitle, { marginRight: 20 }]}>{title}</Text>
  //     </View>
  //   );
  // };

  // const renderMarketCardSmall = () => {
  //   return (
  //     <View style={{ marginTop: 40 }}>
  //       {cardHeader(strings.lainnya_toko)}
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
  //               onPressVoucher={navigateToVoucherScreen}
  //               onPressWishlist={() => console.warn(item)}
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

  const validateButtonAddToCart = () => {
    if (namaVariasiPertama && isEmpty(selectedVariasiPertama)) {
      return true;
    }
    if (namaVariasiKedua && isEmpty(selectedVariasiKedua)) {
      return true;
    }
    return false;
  };

  const renderBottomSheetContent = useCallback(() => {
    const total = useMemo(() => qtyValue * harga, [qtyValue]);

    return (
      <View style={{ padding: sizes.padding }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: fotoProduk[0] }} style={styles.bottomSheetPhoto} />
          <View style={{ marginLeft: sizes.padding }}>
            <Text style={styles.cardHeaderTitle}>{strings.stok}</Text>
            <Text style={[styles.textDesc, { color: colors.bodyTextLightGrey }]}>{stok}</Text>
          </View>
        </View>
        {namaVariasiPertama && (
          <FilterVariasi
            onChangeItem={(item) => setSelectedVariasiPertama(item)}
            item={pilihanVariasiPertama}
            title={namaVariasiPertama}
            style={{ marginTop: sizes.padding }}
          />
        )}
        {namaVariasiKedua && (
          <FilterVariasi
            onChangeItem={(item) => setSelectedVariasiKedua(item)}
            item={pilihanVariasiKedua}
            title={namaVariasiKedua}
            style={{ marginTop: sizes.padding }}
          />
        )}
        <Text style={styles.bottomSheetTitle}>{strings.jumlah}</Text>
        <QtyButton
          onPressMinus={onPressMinusQty}
          onPressPlus={onPressPlusQty}
          qty={qtyValue}
          max={stok}
        />
        <Text style={styles.bottomSheetTitle}>{strings.total_harga}</Text>
        <View style={styles.showNominalContainer}>
          <View style={styles.row}>
            <Image source={icons.icon_rp_dark} style={styles.iconRp} />
            <Text style={styles.textNominal} numberOfLines={1}>
              {formatter.formatNumberToCurreny(total)}
            </Text>
          </View>
        </View>
        <Controller
          control={control}
          name="catatan"
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={(e) => onChange(e)}
              placeholder="Catatan..."
              placeholderTextColor={colors.bodyTextGrey}
              style={{
                marginTop: sizes.padding,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.bodyText,
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                color: colors.bodyText,
              }}
            />
          )}
        />
        <Button
          text={strings.tambahkan_keranjang}
          onPress={handleSubmit(onPressAddToCart)}
          buttonContainerStyle={{ marginTop: sizes.padding * 2 }}
          disabled={validateButtonAddToCart()}
        />
      </View>
    );
  }, [
    onPressMinusQty,
    onPressPlusQty,
    onPressAddToCart,
    setSelectedVariasiPertama,
    setSelectedVariasiKedua,
    qtyValue,
    stok,
    pilihanVariasiPertama,
    pilihanVariasiKedua,
    namaVariasiPertama,
    namaVariasiKedua,
  ]);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
    [],
  );

  const renderPopup = useMemo(
    () => (
      <Popup2Button
        buttonLeftOnPress={() => setShowPopup(false)}
        buttonRightOnPress={navigateToCartScreen}
        buttonLeftTitle={'Tutup'}
        buttonRightTitle={'Buka Keranjang'}
        headerText={'Produk sudah ada di keranjangmu'}
        showPopup={showPopup}
        headerImage={icons.icon_cart}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      />
    ),
    [setShowPopup, showPopup, navigateToCartScreen],
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderPopup}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <HeaderBack rightIcon={renderRightButtonHeader()} />
        {renderPhotos()}
        <View style={{ padding: sizes.padding }}>
          {/* TITLE SECTION */}
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.textName} numberOfLines={2}>
              {nama}
            </Text>
            <TouchableOpacity onPress={onPressAddToFavorit}>
              <Heart color={colors.primary} style={styles.iconWishlist} filled={isFavorit} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textPrice}>{`Rp ${formatter.formatNumberToCurreny(harga)}`}</Text>
          {/* DETAILS SECTION */}
          {renderDetails()}
          {/* <View style={styles.tabContainer}>
            {tab.map((item, index) => (
              <FilterHorizontal
                key={index}
                item={item}
                isSelected={selectedTab === item}
                onPress={() => setSelectedTab(item)}
              />
            ))}
          </View> */}
          {/* {selectedTab === 'Deskripsi' && renderDescDetails()} */}
          {renderDescDetails()}
          {/* {renderMarketCardSmall()} */}
        </View>
      </ScrollView>
      {/* BUTTON */}
      <View style={styles.btnContainer}>
        <Button
          onPress={() => sheetRef.current?.expand()}
          shadow
          text={'Tambahkan Ke Keranjang'}
          buttonContainerStyle={{ width: '100%' }}
        />
        {/* <Button
          onPress={navigateToCartScreen}
          shadow
          text={strings.beli}
          buttonContainerStyle={{ width: '48%' }}
        /> */}
      </View>
      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView>{renderBottomSheetContent()}</BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default MarketProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconHeader: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  optionsContainer: {
    padding: sizes.padding / 2,
    borderRadius: sizes.padding / 1.5,
    width: '60%',
  },
  popupMenuIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textPopupMenu: {
    marginLeft: 10,
    width: '70%',
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
  photosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
  },
  photos: {
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.9,
  },
  dotMainContainer: { width: '100%', marginTop: 10 },
  dotContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: dotSize,
    height: dotSize,
    marginHorizontal: dotSize,
  },
  textName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: colors.bodyText,
  },
  iconWishlist: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.bodyText,
  },
  textDetailsTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.bodyText,
  },
  textDetailsItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 36,
    color: colors.bodyText,
  },
  iconDetails: {
    width: sizes.icon_size * 2,
    height: sizes.icon_size * 2,
  },
  verticalLine: {
    backgroundColor: colors.strokeGrey,
    width: 1,
    height: '80%',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.padding,
  },
  textDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.bodyText,
  },
  textDescItem: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.bodyText,
  },
  logoToko: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cardHeaderTitle: {
    fontSize: 17,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: sizes.padding,
    width: '100%',
    paddingHorizontal: sizes.padding,
  },
  bottomSheetPhoto: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  bottomSheetTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyTextLightGrey,
    marginBottom: 10,
    marginTop: sizes.padding,
  },
  showNominalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRp: { width: 40, height: 40 },
  textNominal: {
    width: '70%',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
});
