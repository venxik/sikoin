import { CommonActions, StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ImageSourcePropType,
  ViewStyle,
  FlatList,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Button,
  CardLastItem,
  CardMarketSmall,
  FilterHorizontal,
  FilterVariasi,
  HeaderBack,
  QtyButton,
} from '../../components';
import { useAppSelector } from '../../config';
import { MarketStackParamList } from '../../config/navigation/model';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { formatter } from '../../utils';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type Props = NativeStackScreenProps<
  MarketStackParamList,
  'MarketItemDetailsScreen'
>;
const dotSize = 6;
const tab = ['Deskripsi', 'Ulasan', 'Diskusi'];

const MarketItemDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const scrollX = useSharedValue(0);
  const { marketDataList } = useAppSelector(state => state.MarketReducer) || {};
  const { marketItemDetails } = useAppSelector(s => s.MarketReducer);
  const {
    asuransi,
    berat,
    deskripsi,
    kondisi,
    namaToko,
    name,
    photos,
    price,
    rating,
    stok,
    terjual,
    ukuran,
    warna,
    logoToko,
    lokasiToko,
  } = marketItemDetails;
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  const [selectedWarna, setSelectedWarna] = useState<string>('');
  const [selectedUkuran, setSelectedUkuran] = useState<string>('');
  const [qtyValue, setQtyValue] = useState<number>(1);

  const navigateToVoucherScreen = () => {
    navigation.dispatch(
      StackActions.push('HomeTab', {
        screen: 'HomeStackNavigator',
        params: {
          screen: 'VoucherStackNavigator',
        },
      }),
    );
  };

  const navigateToDetailsScreen = () => {
    navigation.push('MarketItemDetailsScreen');
  };

  const navigateToCartScreen = () => {
    navigation.push('MarketPayment', { screen: 'CartScreen' });
  };

  const onPressMinusQty = () => {
    if (qtyValue > 1) {
      setQtyValue(e => (e -= 1));
    }
  };

  const onPressPlusQty = () => {
    setQtyValue(e => (e += 1));
  };

  const onPressAddToCart = () => {
    sheetRef.current?.close();
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
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'HomeTab' }],
                }),
              )
            }>
            <View style={styles.popupContainer}>
              <Image
                source={icons.icon_home_outline}
                style={styles.popupMenuIcon}
              />
              <Text style={styles.textPopupMenu}>
                {strings.kembali_ke_beranda}
              </Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('Laporkan Produk')}>
            <View style={styles.popupContainer}>
              <Image
                source={icons.icon_info_outline}
                style={styles.popupMenuIcon}
              />
              <Text style={styles.textPopupMenu}>
                {strings.laporkan_produk}
              </Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert('Pusat Bantuan')}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.icon_pusat_bantuan}
                style={styles.popupMenuIcon}
              />
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
        }}>
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
        {photos.map((_, index) => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];
          const animatedStyles = useAnimatedStyle(() => {
            return {
              width: interpolate(
                scrollX.value,
                inputRange,
                [dotSize + 10, dotSize + 40, dotSize + 10],
                Extrapolate.CLAMP,
              ),
              backgroundColor: interpolateColor(scrollX.value, inputRange, [
                colors.strokeGrey,
                colors.bodyText,
                colors.strokeGrey,
              ]),
            };
          });
          return (
            <Animated.View
              style={[styles.dot, animatedStyles]}
              key={`dot-${index}`}
            />
          );
        })}
      </View>
    );
  };

  const renderPhotos = () => {
    return (
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}>
          {photos.map((item, index) => {
            return (
              <View key={index} style={styles.photosContainer}>
                <Image
                  source={{ uri: item }}
                  resizeMode="cover"
                  style={styles.photos}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
        <View style={styles.dotMainContainer}>{renderPhotosIndicator()}</View>
      </View>
    );
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
            paddingHorizontal: sizes.padding * 1.5,
          },
          style,
        ]}>
        <Text style={styles.textDetailsTitle}>{title}</Text>
        <View style={styles.row}>
          <Image source={icon} style={styles.iconDetails} />
          <Text style={styles.textDetailsItem}>{item}</Text>
        </View>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        style={{
          marginTop: sizes.padding,
          borderBottomColor: colors.strokeGrey,
          borderBottomWidth: 1,
        }}>
        {renderDetailsItem(icons.icon_terjual, terjual, strings.terjual, {
          paddingLeft: 0,
        })}
        <View style={styles.verticalLine} />
        {renderDetailsItem(icons.icon_kondisi, kondisi, strings.kondisi)}
        <View style={styles.verticalLine} />
        {renderDetailsItem(icons.icon_rating, rating, strings.rating)}
        <View style={styles.verticalLine} />
        {renderDetailsItem(icons.icon_berat, berat, strings.berat, {
          paddingRight: 0,
        })}
      </ScrollView>
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
        }}>
        <Text style={styles.textDetailsTitle}>{title}</Text>
        {ifString()}
      </View>
    );
  };

  const renderDescDetails = () => {
    return (
      <View style={{ marginTop: sizes.padding * 1.5 }}>
        <Text style={[styles.textDesc, { marginBottom: 40 }]}>{deskripsi}</Text>
        {renderDescItem(strings.asuransi, asuransi)}
        {renderDescItem(strings.ukuran, ukuran)}
        {renderDescItem(strings.warna, warna)}
        <TouchableOpacity
          style={[
            styles.row,
            {
              padding: sizes.padding * 1.5,
              justifyContent: 'space-between',
            },
          ]}>
          <View style={styles.row}>
            <Image source={{ uri: logoToko }} style={styles.logoToko} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.textDescItem}>{namaToko}</Text>
              <Text
                style={[styles.textDesc, { color: colors.bodyTextLightGrey }]}>
                {lokasiToko}
              </Text>
            </View>
          </View>
          <Image source={icons.arrow_right_primary} style={styles.iconHeader} />
        </TouchableOpacity>
      </View>
    );
  };

  const cardHeader = (title: string) => {
    return (
      <View style={styles.cardHeaderContainer}>
        <Text style={[styles.cardHeaderTitle, { marginRight: 20 }]}>
          {title}
        </Text>
      </View>
    );
  };

  const renderMarketCardSmall = () => {
    return (
      <View style={{ marginTop: 40 }}>
        {cardHeader(strings.lainnya_toko)}
        <FlatList
          horizontal
          data={marketDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardMarketSmall
                item={item}
                onPress={navigateToDetailsScreen}
                onPressVoucher={navigateToVoucherScreen}
              />
              {index === marketDataList.length - 1 && (
                <CardLastItem
                  customText={strings.kunjungi_toko}
                  style={{
                    width: SCREEN_WIDTH * 0.45,
                  }}
                  icon={icons.arrow_right}
                  onPress={() => console.log(item)}
                />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  const renderBottomSheetContent = () => {
    const total = useMemo(() => qtyValue * price, [qtyValue]);

    return (
      <View style={{ padding: sizes.padding }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: photos[0] }} style={styles.bottomSheetPhoto} />
          <View style={{ marginLeft: sizes.padding }}>
            <Text style={styles.cardHeaderTitle}>{strings.stok}</Text>
            <Text
              style={[styles.textDesc, { color: colors.bodyTextLightGrey }]}>
              {stok}
            </Text>
          </View>
        </View>
        <FilterVariasi
          onChangeItem={item => setSelectedWarna(item)}
          item={warna}
          title={strings.warna}
          style={{ marginTop: sizes.padding }}
        />
        <FilterVariasi
          onChangeItem={item => setSelectedUkuran(item)}
          item={ukuran}
          title={strings.ukuran}
          style={{ marginTop: sizes.padding }}
        />
        <Text style={styles.bottomSheetTitle}>{strings.jumlah}</Text>
        <QtyButton
          onPressMinus={onPressMinusQty}
          onPressPlus={onPressPlusQty}
          qty={qtyValue}
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
        <Button
          text={strings.tambahkan_keranjang}
          onPress={onPressAddToCart}
          buttonContainerStyle={{ marginTop: sizes.padding * 2 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <HeaderBack rightIcon={renderRightButtonHeader()} />
        {renderPhotos()}
        <View style={{ padding: sizes.padding }}>
          {/* TITLE SECTION */}
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.textName} numberOfLines={2}>
              {name}
            </Text>
            <TouchableOpacity>
              <Image source={icons.icon_wishlist} style={styles.iconWishlist} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textPrice}>{`Rp ${formatter.formatNumberToCurreny(
            price,
          )}`}</Text>
          {/* DETAILS SECTION */}
          {renderDetails()}
          <View style={styles.tabContainer}>
            {tab.map((item, index) => (
              <FilterHorizontal
                key={index}
                item={item}
                isSelected={selectedTab === item}
                onPress={() => setSelectedTab(item)}
              />
            ))}
          </View>
          {selectedTab === 'Deskripsi' && renderDescDetails()}
          {renderMarketCardSmall()}
        </View>
      </ScrollView>
      {/* BUTTON */}
      <View style={styles.btnContainer}>
        <Button
          onPress={() => sheetRef.current?.expand()}
          shadow
          secondary
          text={strings.keranjang}
          icon={icons.plus_shape}
          iconLocation="left"
          iconStyle={{ width: 10, height: 10 }}
          buttonContainerStyle={{ width: '48%' }}
        />
        <Button
          onPress={navigateToCartScreen}
          shadow
          text={strings.beli}
          buttonContainerStyle={{ width: '48%' }}
        />
      </View>
      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose>
        <BottomSheetScrollView>
          {renderBottomSheetContent()}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default MarketItemDetailsScreen;

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
