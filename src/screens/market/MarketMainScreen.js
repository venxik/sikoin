import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useSelector } from 'react-redux';
import {
  CardLastItem,
  CardMarketLarge,
  CardMarketSmall,
  CardPromo,
  HeaderBack,
  MenuHeaderIcon,
  TextInputBorder,
} from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';

const MarketMainScreen = () => {
  const { promoDataList } = useSelector(state => state.PromoReducer) || {};
  const { marketDataList } = useSelector(state => state.MarketReducer) || {};

  const [searchValue, setSearchValue] = useState('');

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
          optionsContainerStyle={styles.optionsContainer}>
          <MenuOption onSelect={() => alert('Favorit')}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_favorit} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.favorit}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => alert('Keranjang')}>
            <View style={styles.popupContainer}>
              <Image
                source={icons.icon_keranjang}
                style={styles.popupMenuIcon}
              />
              <Text style={styles.textPopupMenu}>{strings.keranjang}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => alert('Pesanan')}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_pesanan} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.pesanan}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => alert('Tentang Market')}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.icon_info_black}
                style={styles.popupMenuIcon}
              />
              <Text style={styles.textPopupMenu}>{strings.tentang_market}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
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

  const renderMarketCardSmall = () => {
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
              <CardMarketSmall item={item} />
              {index === marketDataList.length - 1 && (
                <CardLastItem
                  customText={strings.kunjungi_toko}
                  style={{
                    width: SCREEN_WIDTH * 0.45,
                  }}
                  icon={icons.arrow_right}
                />
              )}
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack rightIcon={renderHeaderIcon()} />
      <ScrollView style={{ paddingHorizontal: sizes.padding }}>
        <MenuHeaderIcon menu={strings.market} />
        {/* TOP MENU */}
        <View style={styles.topMenuContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.topMenuIconContainer}>
              <Image source={icons.icon_kategori} style={styles.topMenuIcon} />
              <Text style={styles.textTopMenu}>{strings.kategori}</Text>
            </View>
            <View style={styles.topMenuIconContainer}>
              <Image source={icons.icon_brand} style={styles.topMenuIcon} />
              <Text style={styles.textTopMenu}>{strings.brand}</Text>
            </View>
            <View style={styles.topMenuIconContainer}>
              <Image source={icons.icon_toko} style={styles.topMenuIcon} />
              <Text style={styles.textTopMenu}>{strings.toko}</Text>
            </View>
          </View>
          <TextInputBorder
            style={{ marginTop: 10 }}
            value={searchValue}
            onChangeText={e => setSearchValue(e)}
            placeholder={strings.search_market_placeholder}
            icon={icons.icon_search_market}
          />
        </View>
        {renderMarketCard()}
        {renderMarketCardSmall()}
        {renderPromoCard()}
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
