import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  CalendarPicker,
  FilterHorizontal,
  HeaderBack,
  MenuHeaderIcon,
  TransaksiItemList,
} from '../../components';
import { TransaksiStackParamList } from '../../config/navigation/model';
import { useAppSelector } from '../../config';
import { colors, icons, sizes, strings } from '../../constants';

const filter = ['Semua', 'Pembelian', 'Topup'];
type Props = NativeStackScreenProps<
  TransaksiStackParamList,
  'TransaksiMainScreen'
>;

const TransaksiMainScreen: FC<Props> = () => {
  const { transaksiDataList } = useAppSelector(s => s.TransaksiReducer) || {};

  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [selectedDate, setSelectedDate] = useState<Date | number | string>(
    Date.now(),
  );

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
            optionsContainerStyle={styles.optionsContainerStyle}>
            <MenuOption onSelect={() => Alert.alert(`Save`)}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={icons.icon_unduh} style={styles.icon} />
                <Text style={styles.textPopupMenu}>
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
          <CalendarPicker
            value={selectedDate}
            onChangeDate={value => setSelectedDate(value)}
          />
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
    marginTop: sizes.padding,
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
