import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button, HeaderBack, Popup1Button } from '../../components';
import { TopupPenarikanStackParamList } from '../../config/navigation/model';
import { colors, icons, images, sizes, strings } from '../../constants';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<
  TopupPenarikanStackParamList,
  'TopupPenarikanDetailScreen'
>;

const TopupDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { selectedTopupPenarikan, nominal, isTopup } = route.params;

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const navigateToPembayaranScreen = () => {
    navigation.navigate('TopupPayment', {
      screen: 'PaymentScreen',
      params: { nominal: parseInt(nominal) },
    });
  };

  const navigateToPenarikanSuccess = () => {
    navigation.navigate('PenarikanSuccessScreen');
  };

  const renderRightButtonHeader = () => {
    return (
      <TouchableOpacity onPress={() => setShowPopup(e => !e)}>
        <Image
          source={icons.icon_shield}
          style={styles.headerIcon}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  const renderTopupDetail = () => (
    <View>
      <Text style={[styles.textTitle, { marginTop: sizes.padding }]}>
        {strings.rincian}
      </Text>
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
            style={[styles.dot, { backgroundColor: colors.bodyTextGrey }]}
          />
          <Text style={styles.textJumlahTopup}>{strings.jumlah_topup}</Text>
        </View>
        <Text style={styles.textJumlahTopup}>
          Rp {formatter.formatStringToCurrencyNumber(nominal)}
        </Text>
      </View>
    </View>
  );

  const renderPenarikanDetail = () => (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.strokeGrey,
          paddingBottom: sizes.padding,
          marginBottom: 10,
          borderStyle: 'dashed',
          justifyContent: 'space-between',
          width: '100%',
        },
      ]}>
      <Text style={[styles.textTitle, { marginTop: sizes.padding }]}>
        {strings.bank_tujuan}
      </Text>
      <Text
        style={[
          styles.textTitle,
          { marginTop: sizes.padding, marginBottom: 0 },
        ]}>
        12321321321
      </Text>
      <Text style={[styles.textTitle, { marginBottom: 0 }]}>Bank BCA</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Popup1Button
        iconStyle={{ width: 150, height: 200, marginBottom: -sizes.padding }}
        headerText={strings.popup_topup_title}
        contentText={strings.popup_topup_content}
        showPopup={showPopup}
        onPress={() => setShowPopup(e => !e)}
        headerImage={images.img_topup_popup}
        customButtonText={strings.ok}
      />
      <HeaderBack
        title={strings.konfirmasi}
        rightIcon={renderRightButtonHeader()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>{strings.jumlah_topup}</Text>
        <View style={styles.rowContainerBorderless}>
          <Image
            source={icons.icon_rp_dark}
            style={styles.icon}
            resizeMode="cover"
          />
          <Text style={styles.textNominal} numberOfLines={1}>
            {formatter.formatStringToCurrencyNumber(nominal)}
          </Text>
        </View>
        <Text style={[styles.textTitle, { marginTop: sizes.padding }]}>
          {strings.untuk_saldo}
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.dot} />
          <Text style={styles.textSelectedTopup}>{selectedTopupPenarikan}</Text>
        </View>
        {isTopup ? renderTopupDetail() : renderPenarikanDetail()}
        <View
          style={[
            styles.rowContainerBorderless,
            {
              justifyContent: 'space-between',
              marginTop: 6,
            },
          ]}>
          <Text style={[styles.textTitle, { marginBottom: 0 }]}>
            {strings.total}
          </Text>
          <Text style={[styles.textNominal, { fontSize: 14 }]}>
            Rp {formatter.formatStringToCurrencyNumber(nominal)}
          </Text>
        </View>
      </View>

      <Button
        buttonContainerStyle={{
          position: 'absolute',
          bottom: 20,
          marginHorizontal: sizes.padding,
          width: '90%',
        }}
        text={isTopup ? strings.pilih_pembayaran : strings.ajukan_penarikan}
        icon={icons.arrow_right_button_white}
        iconLocation={'right'}
        shadow={false}
        onPress={
          isTopup ? navigateToPembayaranScreen : navigateToPenarikanSuccess
        }
      />
    </SafeAreaView>
  );
};

export default TopupDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  mainContainer: {
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
    backgroundColor: colors.white,
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
  textNominal: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
  icon: { width: 40, height: 40 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  textSelectedTopup: {
    fontSize: 15,
    color: colors.primary,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  textJumlahTopup: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
});
