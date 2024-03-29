import React, { FC, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import {
  CalendarPicker,
  FilterHorizontal,
  HeaderBack,
  MenuHeaderIcon,
  TransaksiItemList,
} from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';

const filter = ['Semua', 'Pembelian', 'Topup'];
type Props = NativeStackScreenProps<HomeStackParamList, 'TransaksiMainScreen'>;

const TransaksiMainScreen: FC<Props> = () => {
  const { transaksiDataList } = useAppSelector((s) => s.TransaksiReducer) || {};

  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [startDate, setStartDate] = useState<Date | number | string>(Date.now());
  const [endDate, setEndDate] = useState<Date | number | string>(Date.now());

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Menu>
          <MenuTrigger>
            <Image source={icons.icon_more_menu} style={styles.icon} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                marginTop: 30,
              },
            }}
            optionsContainerStyle={styles.optionsContainerStyle}
          >
            <MenuOption onSelect={() => Alert.alert('Save')}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={icons.icon_unduh} style={styles.icon} />
                <Text style={styles.textPopupMenu}>{strings.unduh_riwayat_transaksi}</Text>
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
        }}
      >
        <MenuHeaderIcon menu={strings.mutasi} />
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CalendarPicker
              style={{ width: '47%' }}
              value={startDate}
              onChangeDate={(value) => setStartDate(value)}
              showIcon={false}
            />
            <View
              style={{
                width: 4,
                height: 1,
                backgroundColor: colors.bodyText,
                marginBottom: sizes.padding,
              }}
            />
            <CalendarPicker
              style={{ width: '47%' }}
              value={endDate}
              onChangeDate={(value) => setEndDate(value)}
              showIcon={false}
            />
          </View>

          <View style={styles.tabContainer}>
            {filter.map((item, index) => (
              <FilterHorizontal
                key={index}
                item={item}
                isSelected={selectedFilter === item}
                onPress={() => setSelectedFilter(item)}
              />
            ))}
          </View>
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
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  optionsContainerStyle: {
    padding: sizes.padding / 2,
    borderRadius: sizes.padding / 1.5,
    width: '45%',
  },
  textPopupMenu: {
    marginLeft: 10,
    width: '70%',
    color: colors.bodyText,
    lineHeight: 24,
    fontFamily: 'Poppins-Medium',
  },
});
