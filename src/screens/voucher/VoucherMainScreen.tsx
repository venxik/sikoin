import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  Button,
  CardVoucherItem,
  CardVoucherLarge,
  HeaderBack,
  MenuHeaderIcon,
  Popup1Button,
  QtyButton,
} from '../../components';
import { SelectedVoucherProps } from '../../components/CardVoucherLarge/model';
import { VoucherStackParamList } from '../../config/navigation/model';
import { useAppSelector } from '../../config';
import { colors, icons, images, sizes, strings } from '../../constants';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<VoucherStackParamList, 'VoucherMainScreen'>;

const VoucherMainScreen: FC<Props> = () => {
  const { voucherDataList } = useAppSelector(s => s.VoucherReducer) || {};
  const [showInfoPopup, setshowInfoPopup] = useState(false);
  const [showVoucherPopup, setshowVoucherPopup] = useState(false);
  const [selectedVoucher, setselectedVoucher] =
    useState<SelectedVoucherProps | null>(null);
  const [qty, setQty] = useState(1);

  const onSelectVoucher = (data: SelectedVoucherProps) => {
    setselectedVoucher(data);
    setshowVoucherPopup(true);
  };

  const onPressBeliVoucher = () => {
    setshowInfoPopup(false);
  };

  const onPressMinus = () => {
    if (qty > 1) {
      setQty(e => e - 1);
    }
  };

  const onPressPlus = () => {
    setQty(e => e + 1);
  };

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
            <MenuOption onSelect={() => Alert.alert(`Go to VoucherKu`)}>
              <View style={styles.menuOptionStyle}>
                <Image source={icons.icon_voucher_black} style={styles.icon} />
                <Text style={styles.textPopupMenu}>{strings.voucherku}</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => setshowInfoPopup(true)}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={icons.icon_info_black} style={styles.icon} />
                <Text style={styles.textPopupMenu}>
                  {strings.tentang_voucher}
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const renderPopupBeli = () => {
    const harga =
      typeof selectedVoucher?.voucher === 'number'
        ? selectedVoucher?.voucher * qty
        : 0;
    const biayaAdmin = 3000;
    const total = harga + biayaAdmin;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVoucherPopup}>
        <View style={styles.modalMainView}>
          <View style={styles.modalView}>
            <CardVoucherItem data={selectedVoucher?.voucher} disabled />
            <Text style={styles.textPopupTitle}>
              {!isEmpty(selectedVoucher) &&
                `${strings.voucher} ${selectedVoucher?.data?.namaToko}`}
            </Text>
            {/* QTY CONTAINER */}
            <QtyButton
              style={{ marginVertical: sizes.padding }}
              onPressMinus={onPressMinus}
              onPressPlus={onPressPlus}
              qty={qty}
            />
            <View style={styles.popupContentContainer}>
              <Text style={styles.textTitle}>{strings.rincian}</Text>
              {/* JUMLAH VOUCHER */}
              <View
                style={[
                  styles.rowContainerBorderless,
                  {
                    paddingBottom: sizes.padding * 0.5,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: colors.bodyTextGrey },
                    ]}
                  />
                  <Text style={styles.textJumlahHarga}>
                    {strings.jumlah_voucher}
                  </Text>
                </View>
                <Text style={styles.textJumlahHarga}>x{qty}</Text>
              </View>
              {/* HARGA */}
              <View
                style={[
                  styles.rowContainerBorderless,
                  {
                    paddingBottom: sizes.padding * 0.5,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: colors.bodyTextGrey },
                    ]}
                  />
                  <Text style={styles.textJumlahHarga}>{strings.harga}</Text>
                </View>
                <Text style={styles.textJumlahHarga}>
                  {`Rp ${formatter.formatNumberToCurreny(harga)}`}
                </Text>
              </View>
              {/* BIAYA ADMIN */}
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: sizes.padding * 0.5,
                    borderStyle: 'dashed',
                    justifyContent: 'space-between',
                    width: '100%',
                  },
                ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: colors.bodyTextGrey },
                    ]}
                  />
                  <Text style={styles.textJumlahHarga}>
                    {strings.biaya_admin}
                  </Text>
                </View>
                <Text style={styles.textJumlahHarga}>
                  {`Rp ${formatter.formatNumberToCurreny(biayaAdmin)}`}
                </Text>
              </View>
              {/* TOTAL */}
              <View
                style={[
                  styles.rowContainerBorderless,
                  { padding: 0, justifyContent: 'space-between', marginTop: 6 },
                ]}>
                <Text style={styles.textTitle}>{strings.total}</Text>
                <Text
                  style={
                    styles.textTitle
                  }>{`Rp${formatter.formatNumberToCurreny(total)}`}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={strings.batal}
                onPress={() => setshowVoucherPopup(e => !e)}
                buttonContainerStyle={{
                  width: '47%',
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                }}
                textStyle={{ color: colors.primary }}
                shadow={false}
              />
              <Button
                text={strings.beli}
                onPress={onPressBeliVoucher}
                buttonContainerStyle={{ width: '47%' }}
                shadow={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack rightIcon={renderRightButtonHeader()} />
      {renderPopupBeli()}
      <Popup1Button
        iconStyle={{
          width: 120,
          height: 160,
          marginBottom: -sizes.padding * 2,
        }}
        headerImage={images.menu_voucher}
        headerText={strings.voucher_center}
        showPopup={showInfoPopup}
        contentText={strings.voucher_info_popup}
        onPress={() => setshowInfoPopup(e => !e)}
      />

      <FlatList
        data={voucherDataList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
        }}
        ListHeaderComponent={<MenuHeaderIcon menu={strings.voucher_center} />}
        ListHeaderComponentStyle={{ marginVertical: sizes.padding }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <CardVoucherLarge
              data={item}
              onPressVoucher={data => onSelectVoucher(data)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
export default VoucherMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: colors.white,
    marginTop: sizes.padding,
    padding: sizes.padding,
  },
  icon: {
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
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    padding: sizes.padding,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsContainerStyle: {
    padding: sizes.padding / 2,
    borderRadius: sizes.padding / 1.5,
    width: '50%',
  },
  menuOptionStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.strokeDarkGrey,
    paddingBottom: 10,
  },
  textPopupTitle: {
    marginTop: sizes.padding,
    color: colors.bodyText,
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
  textTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.bodyText,
    marginBottom: sizes.padding * 0.5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeGrey,
    paddingBottom: sizes.padding,
  },
  rowContainerBorderless: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  popupContentContainer: {
    width: '100%',
    marginBottom: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  textJumlahHarga: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});
