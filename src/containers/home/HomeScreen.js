import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CardKabar,
  CardLastItem,
  CardMarketLarge,
  CardPromo,
  HeaderBack,
} from '../../components';
import { colors, icons, images, strings } from '../../constants';
import { dimensions } from '../../utils';

const HomeScreen = () => {
  const navigation = useNavigation();
  const miniFlatlist = [
    { title: strings.simpanan, amount: '17.000.000', button: strings.mutasi },
    { title: strings.saldo, amount: '100.000.000', button: strings.topup },
  ];
  const miniList2 = {
    simpanan: {
      title: strings.simpanan,
      amount: '17.000.000',
      button: strings.mutasi,
    },
    saldo: {
      title: strings.saldo,
      amount: '100.000.000',
      button: strings.topup,
    },
  };

  const menuList = [
    { image: images.menu_pinjaman, label: strings.pinjaman, navigateTo: '' },
    { image: images.menu_transaksi, label: strings.transaksi, navigateTo: '' },
    { image: images.menu_market, label: strings.market, navigateTo: '' },
    { image: images.menu_voucher, label: strings.voucher, navigateTo: '' },
    { image: images.menu_diskon, label: strings.diskon, navigateTo: '' },
    { image: images.menu_dokumen, label: strings.dokumen, navigateTo: '' },
  ];
  const kabarList = [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
  ];

  const promoList = [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
  ];

  const marketList = [
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
  ];
  const miniFlatlistSize = dimensions.SCREEN_HEIGHT * 0.17;
  const dotSize = 8;
  const menuSize = dimensions.SCREEN_WIDTH * 0.35;
  const cardKabarHeight = dimensions.SCREEN_HEIGHT * 0.5;
  const cardPromoHeight = dimensions.SCREEN_HEIGHT * 0.7;

  const [showSaldo, setShowSaldo] = useState(false);

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
        <Image
          source={icons.arrow_right_circle_primary}
          style={{ width: dimensions.ICON_SIZE, height: dimensions.ICON_SIZE }}
        />
      </View>
    );
  };

  const renderKabarCard = () => {
    return (
      <View style={{ marginVertical: 40 }}>
        {cardHeader(strings.kabar)}
        <FlatList
          horizontal
          data={kabarList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardKabar item={item} style={{ height: cardKabarHeight }} />
              {index === kabarList.length - 1 && (
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
          data={promoList}
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
          data={marketList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardMarketLarge
                item={item}
                style={{ height: cardPromoHeight }}
              />
              {index === marketList.length - 1 && (
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
      <View>
        <FlatList
          data={menuList}
          contentContainerStyle={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingTop: 40,
          }}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
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
          )}
        />
      </View>
    );
  };

  const renderMiniList2 = () => {
    return (
      <View
        style={{
          width: '100%',
          borderRadius: 20,
          backgroundColor: colors.tonalLightPrimary,
          borderColor: colors.primary,
          borderWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', marginRight: 10 }}
          onPress={() => setShowSaldo(e => !e)}>
          <Image
            source={
              showSaldo
                ? icons.arrow_up_circle_primary
                : icons.arrow_down_circle_primary
            }
            style={{
              width: dimensions.ICON_SIZE * 1.2,
              height: dimensions.ICON_SIZE * 1.2,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            height: miniFlatlistSize,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.black,
                  fontWeight: 'bold',
                }}>
                {showSaldo ? miniList2.saldo.title : miniList2.simpanan.title}
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
              {showSaldo ? miniList2.saldo.amount : miniList2.simpanan.amount}
            </Text>
          </View>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
            <Image
              source={showSaldo ? icons.icon_mutasi : icons.icon_topup}
              style={{ width: 40, height: 40, marginBottom: 10 }}
              resizeMode="contain"
            />
            <Text>
              {showSaldo ? miniList2.saldo.button : miniList2.simpanan.button}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMiniFlatlist = () => {
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
          {miniFlatlist.map((_, index) => {
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
        <View
          style={{
            height: miniFlatlistSize,
            overflow: 'hidden',
          }}>
          <Animated.FlatList
            data={miniFlatlist}
            pagingEnabled
            snapToInterval={miniFlatlistSize}
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: '100%',
                  height: miniFlatlistSize,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ justifyContent: 'space-between' }}>
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
                  <Text style={{ fontSize: 15 }}>{'Rp ' + item.amount}</Text>
                </View>
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
            )}
          />
        </View>
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
        <TouchableOpacity>
          <ImageBackground
            source={images.dummy_profile_pic}
            style={{
              width: dimensions.SCREEN_WIDTH * 0.25,
              height: dimensions.SCREEN_WIDTH * 0.25,
            }}>
            <Image
              source={images.dummy_koperasi_pic}
              style={{
                width: dimensions.SCREEN_WIDTH * 0.2,
                height: dimensions.SCREEN_WIDTH * 0.2,
                position: 'absolute',
                bottom: -dimensions.SCREEN_WIDTH * 0.08,
                right: -dimensions.SCREEN_WIDTH * 0.05,
              }}
            />
          </ImageBackground>
        </TouchableOpacity>

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
            Hi, Egsdasdasdasdasdasa!
          </Text>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 6 }}>JBC-0001</Text>
            <Text style={{ fontSize: 14, color: colors.black }}>
              {'Jababeka & co'}
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
        <TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        disabled={true}
        title={strings.beranda}
        customLeftIcon={icons.icon_home_header}
        rightIcon={renderRightButtonHeader()}
      />
      <ScrollView
        // contentContainerStyle={{ flex: 1, width: '100%' }}
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
          {renderMiniList2()}
          {/* {renderMiniFlatlist()} */}
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
