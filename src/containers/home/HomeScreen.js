import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { formatter } from '../../utils';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const miniFlatlistSize = SCREEN_HEIGHT * 0.17;
const dotSize = 8;
const menuSize = SCREEN_WIDTH * 0.35;
const cardKabarHeight = SCREEN_HEIGHT * 0.45;
const cardPromoHeight = SCREEN_HEIGHT * 0.7;

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

  const { kabarDataList } = useSelector(state => state.KabarReducer) || {};
  const { promoDataList } = useSelector(state => state.PromoReducer) || {};
  const { marketDataList } = useSelector(state => state.MarketReducer) || {};
  const { profileData } = useSelector(state => state.ProfileReducer) || {};
  const { nama, code, koperasiName } = profileData || {};
  const [selectedKabar, setSelectedKabar] = useState({});
  const { simpanan, saldo } = useSelector(state => state.SaldoSimpananReducer);

  // variables
  const snapPoints = useMemo(() => ['10%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(() => {
    // console.log('handleSheetChanges', index);
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
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.cardHeaderTitle}>{title}</Text>
        <TouchableOpacity>
          <Image
            source={icons.arrow_right_circle_primary}
            style={styles.icon}
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
      <View style={styles.menuContainer}>
        {menuList.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuInnerContainer}>
            <Image
              source={item.image}
              style={{ width: menuSize, height: menuSize }}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderMiniScrollView = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
      <View style={styles.miniScrollContainer}>
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
                style={[
                  styles.dotIndicator,
                  {
                    backgroundColor: color,
                  },
                ]}
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
              <View key={index} style={styles.miniScrollInnerContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigateToSaldoSimpanan(item.title === strings.saldo)
                  }
                  style={{ justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.textMiniScrollTitle}>{item.title}</Text>
                    <Image
                      source={icons.arrow_right_primary_2}
                      style={styles.miniScrollArrow}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.textSaldo}>
                    Rp{' '}
                    {item.title === strings.simpanan
                      ? formatter.formatStringToCurrencyNumber(simpanan.total)
                      : formatter.formatStringToCurrencyNumber(saldo.total)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniScrollButton}>
                  <Image
                    source={
                      item.button === strings.mutasi
                        ? icons.icon_mutasi
                        : icons.icon_topup
                    }
                    style={styles.iconMiniScrollButton}
                    resizeMode="contain"
                  />
                  <Text style={{ color: colors.bodyText }}>{item.button}</Text>
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
      <View style={styles.profileContainer}>
        <ProfilePicture onPress={navigateToProfile} />
        <View style={styles.profileInnerContainer}>
          <Text style={styles.textProfileName}>Hi, {nama}!</Text>
          <View>
            <Text style={styles.textProfileCode}>{code}</Text>
            <Text style={styles.textProfileKoperasi}>{koperasiName}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <Menu>
          <MenuTrigger>
            <Image
              source={icons.icon_notification}
              style={styles.icon}
              resizeMode="contain"
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              padding: sizes.padding / 2,
              borderRadius: sizes.padding,
            }}>
            <MenuOption onSelect={() => alert(`Save`)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={icons.icon_notification}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    width: '80%',
                  }}>
                  This is only test, please disperse
                </Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Not called`)}
              disabled={true}
              text="Disabled"
            />
          </MenuOptions>
        </Menu> */}
        <TouchableOpacity>
          <Image
            source={icons.icon_notification}
            style={styles.icon}
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
          <View style={{ padding: sizes.padding }}>
            <View style={styles.kabarSheetContainer}>
              <View style={styles.kabarSheetTopIcon} />
              <Text style={styles.kabarSheetCompany}>
                {selectedKabar.company}
              </Text>
            </View>
            <Text style={styles.textKabarSheetTitle}>
              {selectedKabar.title}
            </Text>
            <View style={styles.kabarSheetBottomContainer}>
              <Image
                source={selectedKabar.profile_pic}
                style={styles.kabarSheetProfileImage}
              />
              <View style={styles.kabarSheetNameContainer}>
                <Text style={styles.kabarSheetNameText}>{nama}</Text>
                <Text style={styles.kabarSheetTimeStampText}>
                  {selectedKabar.timestamp}
                </Text>
              </View>
            </View>
            <Text style={styles.kabarSheetContentText}>
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
            marginHorizontal: SCREEN_WIDTH * 0.05,
          }}>
          <View style={{ marginBottom: 20 }}>{renderProfile()}</View>
          {renderMiniScrollView()}
          {renderMenuFlatlist()}
        </View>
        <View
          style={{
            marginHorizontal: SCREEN_WIDTH * 0.05,
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
  cardHeaderContainer: { flexDirection: 'row', width: '100%' },
  cardHeaderTitle: {
    fontSize: 17,
    color: colors.bodyText,
    fontWeight: 'bold',
    marginRight: 20,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  menuContainer: {
    marginTop: 40,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  menuInnerContainer: {
    alignItems: 'center',
    width: '50%',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    position: 'absolute',
    bottom: 25,
    color: colors.bodyText,
  },
  miniScrollContainer: {
    borderRadius: 20,
    backgroundColor: colors.tonalLightPrimary,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  dotIndicator: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    margin: dotSize / 2,
  },
  miniScrollInnerContainer: {
    width: '100%',
    height: miniFlatlistSize,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textMiniScrollTitle: {
    fontSize: 20,
    color: colors.bodyText,
    fontWeight: 'bold',
  },
  miniScrollArrow: {
    width: sizes.icon_size * 0.8,
    height: sizes.icon_size * 0.8,
    marginLeft: 10,
  },
  miniScrollButton: { alignItems: 'center', marginRight: 20 },
  iconMiniScrollButton: { width: 40, height: 40, marginBottom: 10 },
  profileContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  profileInnerContainer: {
    width: '60%',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  textProfileName: {
    fontSize: 24,
    color: colors.bodyText,
    fontWeight: 'bold',
  },
  textProfileCode: {
    marginBottom: 6,
    color: colors.bodyTextLightGrey,
    fontSize: 15,
  },
  textProfileKoperasi: { fontSize: 15, color: colors.black },
  kabarSheetContainer: {
    flexDirection: 'row',
    marginBottom: sizes.padding,
  },
  kabarSheetTopIcon: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginRight: 10,
  },
  kabarSheetCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  textKabarSheetTitle: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
  },
  kabarSheetBottomContainer: { flexDirection: 'row', marginVertical: 30 },
  kabarSheetProfileImage: { width: 60, height: 60 },
  kabarSheetNameContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  kabarSheetNameText: { justifyContent: 'space-evenly', marginLeft: 10 },
  kabarSheetTimeStampText: { fontSize: 15, color: colors.bodyTextGrey },
  kabarSheetContentText: {
    fontSize: 15,
    color: colors.bodyText,
    lineHeight: 24,
  },
  textSaldo: { fontSize: 15, color: colors.bodyTextGrey },
});
