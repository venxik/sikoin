import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { HeaderBack, Popup1Button, SaldoItemList } from '../../components';
import { colors, icons, images, strings } from '../../constants';
import { currency, dimensions } from '../../utils';

const Button = props => {
  const { icon, text } = props || {};
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={icon} style={{ width: 50, height: 50 }} />
      <Text>{text}</Text>
    </View>
  );
};

const SaldoSimpananMainScreen = ({ route }) => {
  const { showSaldo } = route.params || {};
  const navigation = useNavigation();
  const { simpanan, saldo } = useSelector(state => state.SaldoSimpananReducer);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  // callbacks
  const handleSheetChange = useCallback(() => {
    // console.log('handleSheetChange', index);
  }, []);

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setShowInfoModal(e => !e)}>
          <Image
            source={icons.icon_info}
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

  const renderSaldoContent = () => {
    return (
      <View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.white,
            paddingVertical: 20,
            paddingHorizontal: 40,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Button
            icon={icons.icon_penarikan_primary}
            text={strings.penarikan}
          />
          <Button icon={icons.icon_mutasi_primary} text={strings.mutasi} />
          <Button
            icon={icons.icon_transaksi_primary}
            text={strings.transaksi}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <SaldoItemList
            text={strings.pokok}
            nominal={saldo.simpananSukarela}
          />
        </View>
      </View>
    );
  };

  const renderSimpananContent = () => {
    return (
      <View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.white,
            paddingVertical: 20,
            paddingHorizontal: 40,
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <Button
            icon={icons.icon_penarikan_primary}
            text={strings.penarikan}
          />
          <Button icon={icons.icon_mutasi_primary} text={strings.mutasi} />
        </View>
        <View style={{ marginTop: 40 }}>
          <SaldoItemList text={strings.pokok} nominal={simpanan.pokok} />
          <SaldoItemList text={strings.wajib} nominal={simpanan.wajib} />
          <SaldoItemList text={strings.sukarela} nominal={simpanan.sukarela} />
        </View>
      </View>
    );
  };

  const renderBackgroundItem = () => (
    <ImageBackground
      source={images.daftar_koperasi_bg}
      style={{
        width: '100%',
        height: dimensions.SCREEN_HEIGHT * 0.8,
      }}>
      <View
        style={{
          marginTop: -40,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Image
          source={showSaldo ? images.img_saldo_icon : images.img_simpanan_icon}
          style={{
            width: dimensions.SCREEN_WIDTH * 0.4,
            height: dimensions.SCREEN_WIDTH * 0.4,
          }}
        />
        <Text
          style={{
            color: colors.primaryLight,
            marginTop: 20,
            fontWeight: '500',
          }}>
          {showSaldo ? strings.totalSaldo : strings.totalSimpanan} :
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.icon_rp}
            style={{ width: 34, height: 34 }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontSize: 34,
              color: colors.white,
              marginLeft: 16,
              fontWeight: '700',
            }}>
            {showSaldo
              ? currency.formatStringToCurrencyNumber(saldo.total)
              : currency.formatStringToCurrencyNumber(simpanan.total)}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );

  const customSaldoPopupContent = () => (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20,
        marginBottom: 20,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.primary,
            marginRight: 10,
          }}
        />
        <Text style={{ color: colors.primary, fontWeight: '500' }}>
          {strings.market}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.primary,
            marginRight: 10,
          }}
        />
        <Text style={{ color: colors.primary, fontWeight: '500' }}>
          {strings.voucher_center}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        style={{ position: 'absolute', top: 0, zIndex: 2 }}
        onPress={() => navigation.goBack()}
        title={showSaldo ? strings.saldo : strings.simpanan}
        customLeftIcon={icons.arrow_left_white}
        rightIcon={renderRightButtonHeader()}
        textStyle={{ color: colors.white }}
      />
      <Popup1Button
        headerText={showSaldo ? strings.saldo : strings.simpanan}
        contentText={
          showSaldo
            ? strings.popup_saldo_content
            : strings.popup_simpanan_content
        }
        showModal={showInfoModal}
        onPress={() => setShowInfoModal(e => !e)}
        headerImage={
          showSaldo ? images.img_saldo_icon : images.img_simpanan_icon
        }
        customButtonText={strings.paham}
        iconStyle={{ width: 100, height: 100 }}
        customContent={customSaldoPopupContent()}
      />
      {renderBackgroundItem()}
      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.primaryWhite }}
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <BottomSheetScrollView>
          <View
            style={{
              padding: 20,
              width: '100%',
              height: '100%',
              backgroundColor: colors.primaryWhite,
            }}>
            {showSaldo ? renderSaldoContent() : renderSimpananContent()}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default SaldoSimpananMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
