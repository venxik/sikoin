import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useSelector } from 'react-redux';
import {
  DropdownForm,
  FilterHorizontal,
  HeaderBack,
  MenuHeaderIcon,
  TransaksiItemList,
} from '../../components';
import { colors, icons, sizes, strings } from '../../constants';

const filter = ['Semua', 'Pembelian', 'Topup'];

const TransaksiMainScreen = () => {
  const { transaksiDataList } = useSelector(s => s.TransaksiReducer) || {};

  const [selectedFilter, setSelectedFilter] = useState(filter[0]);

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Menu>
          <MenuTrigger>
            <Image
              source={icons.icon_more_menu}
              style={styles.icon}
              resizeMode="contain"
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                marginTop: 30,
              },
            }}
            optionsContainerStyle={{
              padding: sizes.padding / 2,
              borderRadius: sizes.padding / 1.5,
              width: '45%',
            }}>
            <MenuOption onSelect={() => alert(`Save`)}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={icons.icon_unduh}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    width: '70%',
                    color: colors.bodyText,
                    fontWeight: '500',
                    fontSize: 15,
                    lineHeight: 24,
                  }}>
                  {strings.unduh_riwayat_transaksi}
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack rightIcon={renderRightButtonHeader()} />
      <ScrollView
        style={{
          padding: sizes.padding,
        }}>
        <MenuHeaderIcon menu={strings.transaksi} />
        <View style={styles.mainContainer}>
          <DropdownForm
            value="01 Jan 2022 - 27 Jan 2022"
            icon={icons.icon_calendar_small}
          />
          <ScrollView horizontal style={{ marginTop: sizes.padding }}>
            {filter.map((item, index) => (
              <FilterHorizontal
                key={index}
                item={item}
                isSelected={selectedFilter === item}
                onPress={() => setSelectedFilter(item)}
              />
            ))}
          </ScrollView>
          <View style={{ marginTop: sizes.padding }}>
            {transaksiDataList.map((item, i) => (
              <TransaksiItemList item={item} key={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TransaksiMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: colors.white,
    marginTop: sizes.padding,
    padding: sizes.padding,
    borderRadius: sizes.padding,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
});
