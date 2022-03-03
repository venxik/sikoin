import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  CardKabar,
  CardLastItem,
  CardMarketLarge,
  CardPromo,
  CustomBackdrop,
  HeaderBack,
  ProfilePicture,
} from '../../components';
import { colors, icons, images, strings } from '../../constants';
import { dimensions, formatter } from '../../utils';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const HomeScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const saldoFlatlist = [
    { title: strings.simpanan, button: strings.mutasi },
    { title: strings.saldo, button: strings.topup },
  ];

  const menuList = [
    { image: images.menu_pinjaman, label: strings.pinjaman, navigateTo: '' },
    { image: images.menu_transaksi, label: strings.transaksi, navigateTo: '' },
    { image: images.menu_market, label: strings.market, navigateTo: '' },
    { image: images.menu_voucher, label: strings.voucher, navigateTo: '' },
    { image: images.menu_diskon, label: strings.diskon, navigateTo: '' },
    { image: images.menu_dokumen, label: strings.dokumen, navigateTo: '' },
  ];

  const miniFlatlistSize = dimensions.SCREEN_HEIGHT * 0.17;
  const dotSize = 8;
  const menuSize = dimensions.SCREEN_WIDTH * 0.35;
  const cardKabarHeight = dimensions.SCREEN_HEIGHT * 0.5;
  const cardPromoHeight = dimensions.SCREEN_HEIGHT * 0.7;

  const { kabarDataList } = useSelector(state => state.KabarReducer);
  const { promoDataList } = useSelector(state => state.PromoReducer);
  const { marketDataList } = useSelector(state => state.MarketDataReducer);
  const { profileData } = useSelector(state => state.ProfileDataReducer);
  const { name, code, koperasiName } = profileData || {};
  const [selectedKabar, setSelectedKabar] = useState({});
  const { simpanan, saldo } = useSelector(state => state.SaldoSimpananReducer);

  // variables
  const snapPoints = useMemo(() => ['10%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const selectKabarCard = item => {
    setSelectedKabar(item);
    handlePresentModalPress();
  };

  const navigateToSaldoSimpanan = showSaldo => {
    navigation.navigate('SaldoSimpananStackNavigator', {
      screen: 'SaldoSimpananMainScreen',
      params: { showSaldo: showSaldo },
    });
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileStackNavigator');
  };

  const cardHeader = title => {
    return (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text
          style={{
            fontSize: 17,
            color: colors.bodyText,
            fontWeight: 'bold',
            marginRight: 20,
          }}>
          {title}
        </Text>
        <TouchableOpacity>
          <Image
            source={icons.arrow_right_circle_primary}
            style={{
              width: dimensions.ICON_SIZE,
              height: dimensions.ICON_SIZE,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderKabarCard = () => {
    return (
      <View style={{ marginVertical: 40 }}>
        {cardHeader(strings.kabar)}
        <FlatList
          horizontal
          data={kabarDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardKabar
                item={item}
                style={{ height: cardKabarHeight }}
                onPress={() => selectKabarCard(item)}
              />
              {index === kabarDataList.length - 1 && (
                <CardLastItem
                  style={{ height: cardKabarHeight }}
                  icon={icons.icon_kabar_white}
                />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  const renderPromoCard = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        {cardHeader(strings.promo)}
        <FlatList
          horizontal
          data={promoDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20 }}>
              <CardPromo item={item} style={{ height: cardPromoHeight }} />
            </View>
          )}
        />
      </View>
    );
  };

  const renderMarketCard = () => {
    return (
      <View style={{ marginBottom: 40 }}>
        {cardHeader(strings.market)}
        <FlatList
          horizontal
          data={marketDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardMarketLarge
                item={item}
                style={{ height: cardPromoHeight }}
              />
              {index === marketDataList.length - 1 && (
                <CardLastItem
                  style={{ height: cardPromoHeight }}
                  icon={icons.icon_market_white}
                />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  const renderMenuFlatlist = () => {
    return (
      <View
        style={{
          marginTop: 40,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          flexDirection: 'row',
          width: '100%',
        }}>
        {menuList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              alignItems: 'center',
              width: '50%',
              paddingVertical: 10,
            }}>
            <Image
              source={item.image}
              style={{ width: menuSize, height: menuSize }}
            />
            <Text style={{ fontSize: 16, position: 'absolute', bottom: 25 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderMiniScrollView = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
      <View
        style={{
          borderRadius: 20,
          backgroundColor: colors.tonalLightPrimary,
          borderColor: colors.primary,
          borderWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{ justifyContent: 'center' }}>
          {saldoFlatlist.map((_, index) => {
            const inputRange = [
              (index - 1) * miniFlatlistSize,
              index * miniFlatlistSize,
              (index + 1) * miniFlatlistSize,
            ];
            const color = scrollY.interpolate({
              inputRange,
              outputRange: [
                colors.strokeDarkGrey,
                colors.black,
                colors.strokeDarkGrey,
              ],
            });
            return (
              <Animated.View
                key={index.toString()}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize,
                  backgroundColor: color,
                  margin: dotSize / 2,
                }}
              />
            );
          })}
        </View>
        <Animated.ScrollView
          style={{ height: miniFlatlistSize }}
          nestedScrollEnabled={true}
          pagingEnabled
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}>
          {saldoFlatlist.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  height: miniFlatlistSize,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigateToSaldoSimpanan(item.title === strings.saldo)
                  }
                  style={{ justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.black,
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={icons.arrow_right_primary_2}
                      style={{
                        width: dimensions.ICON_SIZE * 0.8,
                        height: dimensions.ICON_SIZE * 0.8,
                        marginLeft: 10,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={{ fontSize: 15 }}>
                    Rp{' '}
                    {index === 1
                      ? formatter.formatStringToCurrencyNumber(simpanan.total)
                      : formatter.formatStringToCurrencyNumber(saldo.total)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: 'center', marginRight: 20 }}>
                  <Image
                    source={
                      item.button === 'Mutasi'
                        ? icons.icon_mutasi
                        : icons.icon_topup
                    }
                    style={{ width: 40, height: 40, marginBottom: 10 }}
                    resizeMode="contain"
                  />
                  <Text>{item.button}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  };

  const renderProfile = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <ProfilePicture onPress={navigateToProfile} />
        <View
          style={{
            width: '60%',
            marginLeft: 20,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 24,
              color: colors.black,
              fontWeight: 'bold',
            }}>
            Hi, {name}
          </Text>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 6 }}>{code}</Text>
            <Text style={{ fontSize: 14, color: colors.black }}>
              {koperasiName}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity>
          <Image
            source={icons.icon_scan}
            style={{
              width: dimensions.ICON_SIZE,
              height: dimensions.ICON_SIZE,
              marginRight: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Image
            source={icons.icon_notification}
            style={{
              width: dimensions.ICON_SIZE,
              height: dimensions.ICON_SIZE,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottomSheet = () => {
    return (
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        enablePanDownToClose
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView>
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 3,
                  backgroundColor: colors.primary,
                  borderRadius: 3,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.primary,
                }}>
                {selectedKabar.company}
              </Text>
            </View>
            <Text
              style={{ fontSize: 24, color: colors.black, fontWeight: 'bold' }}>
              {selectedKabar.title}
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: 30 }}>
              <Image
                source={selectedKabar.profile_pic}
                style={{ width: 60, height: 60 }}
              />
              <View style={{ justifyContent: 'space-evenly', marginLeft: 10 }}>
                <Text style={{ color: colors.bodyText, fontSize: 16 }}>
                  {name}
                </Text>
                <Text style={{ fontSize: 15, color: colors.bodyTextGrey }}>
                  {selectedKabar.timestamp}
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 15, color: colors.bodyText, lineHeight: 24 }}>
              {selectedKabar.fullContent}
            </Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        disabled={true}
        title={strings.beranda}
        customLeftIcon={icons.icon_home_header}
        rightIcon={renderRightButtonHeader()}
      />
      {renderBottomSheet()}

      <ScrollView
        nestedScrollEnabled={true}
        style={{ width: '100%', height: '100%' }}>
        {/* BODY */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            paddingVertical: 20,
            marginHorizontal: dimensions.SCREEN_WIDTH * 0.05,
          }}>
          <View style={{ marginBottom: 20 }}>{renderProfile()}</View>
          {renderMiniScrollView()}
          {renderMenuFlatlist()}
        </View>
        <View
          style={{
            marginHorizontal: dimensions.SCREEN_WIDTH * 0.05,
          }}>
          {renderKabarCard()}
          {renderPromoCard()}
          {renderMarketCard()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
