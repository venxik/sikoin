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
  BackHandler,
  SafeAreaView,
} from 'react-native';
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
import { useAppSelector } from '../../config/store/ReduxStore';
import { HomeTabScreenProps } from '../../config/types/NavigationTypes';
import { KabarData } from '../../redux/reducers/KabarReducer';

const miniFlatlistSize = SCREEN_HEIGHT * 0.14;
const dotSize = 8;
const menuSize = SCREEN_HEIGHT * 0.15;

const saldoFlatlist = [
  { title: strings.simpanan, button: strings.mutasi },
  { title: strings.saldo_belanja, button: strings.topup },
];

const menuList = [
  {
    image: images.menu_pinjaman,
    label: strings.pinjaman,
    navigateTo: 'PinjamanStackNavigator',
  },
  {
    image: images.menu_market,
    label: strings.market,
    navigateTo: 'MarketStackNavigator',
  },
  {
    image: images.menu_voucher,
    label: strings.voucher,
    navigateTo: 'VoucherStackNavigator',
  },
  {
    image: images.menu_dokumen,
    label: strings.dokumen,
    navigateTo: 'DokumenStackNavigator',
  },
];

const HomeScreen = ({
  navigation,
}: HomeTabScreenProps<'HomeStackNavigator'>) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { kabarDataList } = useAppSelector(state => state.KabarReducer) || {};
  const { promoDataList } = useAppSelector(state => state.PromoReducer) || {};
  const { marketDataList } = useAppSelector(state => state.MarketReducer) || {};
  const { profileData } = useAppSelector(state => state.ProfileReducer) || {};
  const { nama, code, koperasiName } = profileData || {};
  const { simpanan, saldo } = useAppSelector(
    state => state.SaldoSimpananReducer,
  );
  const [selectedKabar, setSelectedKabar] = useState<KabarData | null>(null);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        return false;
      }
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // BOTTOMSHEET
  const snapPoints = useMemo(() => ['85%', '90%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const selectKabarCard = (item: KabarData) => {
    setSelectedKabar(item);
    handlePresentModalPress();
  };

  const navigateToSaldoSimpanan = (showSaldo: boolean) => {
    navigation.navigate('SaldoSimpananStackNavigator', {
      screen: 'SaldoSimpananMainScreen',
      params: { showSaldo: showSaldo },
    });
  };

  const navigateToOtherScreen = (screen: string) => {
    switch (screen) {
      case 'PinjamanStackNavigator':
        navigation.navigate('PinjamanStackNavigator');
        return;
      case 'MarketStackNavigator':
        navigation.navigate('MarketStackNavigator');
        return;
      case 'VoucherStackNavigator':
        navigation.navigate('VoucherStackNavigator');
        return;
      case 'DokumenStackNavigator':
        navigation.navigate('DokumenStackNavigator');
        return;
      default:
        return;
    }
  };

  const onClickMiniScrollButton = (showSaldo: boolean) => {
    if (showSaldo) {
      navigation.navigate('TopupStackNavigator');
    } else {
      navigation.navigate('TransaksiStackNavigator');
    }
  };

  const cardHeader = (title: string) => {
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
              <CardKabar item={item} onPress={() => selectKabarCard(item)} />
              {index === kabarDataList.length - 1 && (
                <CardLastItem icon={icons.icon_kabar_white} />
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
              <CardPromo item={item} />
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
              <CardMarketLarge item={item} />
              {index === marketDataList.length - 1 && (
                <CardLastItem icon={icons.icon_market_white} />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  const renderMainMenu = () => {
    return (
      <View style={styles.menuContainer}>
        {menuList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuInnerContainer}
            onPress={() => navigateToOtherScreen(item.navigateTo)}>
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
          scrollEventThrottle={16}>
          {saldoFlatlist.map((item, index) => {
            return (
              <View key={index} style={styles.miniScrollInnerContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigateToSaldoSimpanan(
                      item.title === strings.saldo_belanja,
                    )
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
                      ? formatter.formatNumberToCurreny(simpanan.total)
                      : formatter.formatNumberToCurreny(saldo.total)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.miniScrollButton}
                  onPress={
                    // () => {}
                    () =>
                      onClickMiniScrollButton(
                        item.title === strings.saldo_belanja,
                      )
                  }>
                  <Image
                    source={
                      item.button === strings.mutasi
                        ? icons.icon_mutasi
                        : icons.icon_topup
                    }
                    style={styles.iconMiniScrollButton}
                    resizeMode="contain"
                  />
                  <Text style={styles.textMiniScrollBtn}>{item.button}</Text>
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
        <ProfilePicture
          onPress={() => navigateToOtherScreen('ProfileStackNavigator')}
        />
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
      <TouchableOpacity>
        <Image
          source={icons.icon_notification}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderBottomSheet = () => {
    return (
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        enablePanDownToClose
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <View style={{ padding: sizes.padding }}>
            <View style={styles.kabarSheetContainer}>
              <View style={styles.kabarSheetTopIcon} />
              <Text style={styles.kabarSheetCompany}>
                {selectedKabar?.company}
              </Text>
            </View>
            <Text style={styles.textKabarSheetTitle}>
              {selectedKabar?.title}
            </Text>
            <View style={styles.kabarSheetBottomContainer}>
              <Image
                source={{ uri: selectedKabar?.profilePic }}
                style={styles.kabarSheetProfileImage}
              />
              <View style={styles.kabarSheetNameContainer}>
                <Text style={styles.kabarSheetNameText}>{nama}</Text>
                <Text style={styles.kabarSheetTimeStampText}>
                  {selectedKabar?.timestamp}
                </Text>
              </View>
            </View>
            <Text style={styles.kabarSheetContentText}>
              {selectedKabar?.fullContent}
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
          {renderMainMenu()}
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
    fontFamily: 'Poppins-Bold',
    marginRight: 20,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  menuContainer: {
    marginTop: sizes.padding,
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
    marginTop: -sizes.padding,
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Bold',
  },
  textSaldo: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Medium',
  },
  textMiniScrollBtn: { fontFamily: 'Poppins-Medium', color: colors.bodyText },
  miniScrollArrow: {
    width: sizes.icon_size * 0.8,
    height: sizes.icon_size * 0.8,
    marginLeft: 10,
  },
  miniScrollButton: { alignItems: 'center', marginRight: 20 },
  iconMiniScrollButton: { width: 40, height: 40 },
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
    fontFamily: 'Poppins-Bold',
  },
  textProfileCode: {
    color: colors.bodyTextLightGrey,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  textProfileKoperasi: {
    fontSize: 15,
    color: colors.bodyText,
    fontFamily: 'Inter-Regular',
  },
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
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },
  textKabarSheetTitle: {
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
  },
  kabarSheetBottomContainer: { flexDirection: 'row', marginVertical: 30 },
  kabarSheetProfileImage: { width: 60, height: 60, borderRadius: 60 },
  kabarSheetNameContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  kabarSheetNameText: {
    justifyContent: 'center',
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.bodyText,
  },
  kabarSheetTimeStampText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  kabarSheetContentText: {
    fontSize: 15,
    color: colors.bodyText,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
});
