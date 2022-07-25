import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, CheckoutItem, HeaderBack } from '../../components';
import CardAlamat from '../../components/CardAlamat';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'CheckoutScreen'>;

const Section = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <View style={styles.sectionContainer}>
      {!isEmpty(title) && <Text style={styles.sectionTitle}>{title}</Text>}
      <View>{children}</View>
    </View>
  );
};

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  let totalPrice = 0;
  const { alamatList } = useAppSelector(s => s.AlamatReducer);
  const { cartItemDataList } = useAppSelector(s => s.MarketReducer);

  useMemo(
    () =>
      cartItemDataList.map(item => {
        totalPrice = totalPrice + item.price;
      }),
    [],
  );

  const navigateToAlamatScreen = () => {
    console.log('navigateToAlamatScreen');
  };

  const navigateToSelectPayment = () => {
    navigation.navigate('SelectPaymentScreen');
  };

  const renderPengiriman = () => {
    return (
      <View style={[styles.row, { alignItems: 'baseline' }]}>
        <View>
          <Text style={styles.textNormal}>Reguler</Text>
          <Text style={[styles.textSmall, { marginTop: 4 }]}>
            Akan diterima pada tanggal 2 - 5 Feb
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textHargaPengiriman}>Rp 16.000</Text>
          <Image
            source={icons.arrow_right_primary_2}
            style={styles.iconArrow}
          />
        </View>
      </View>
    );
  };

  const renderTotalPesanan = () => {
    return (
      <View style={styles.row}>
        <Text
          style={styles.textNormal}>{`${cartItemDataList.length} Produk`}</Text>
        <Text style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
          totalPrice,
        )}`}</Text>
      </View>
    );
  };

  const renderMetodePembayaran = () => {
    return (
      <View>
        <View style={[styles.row, { width: '50%' }]}>
          <Text style={styles.textHargaPengiriman}>
            Transfer Bank - Bank BCA (Dicek Otomatis)
          </Text>
          <Image
            source={icons.arrow_right_primary_2}
            style={styles.iconArrow}
          />
        </View>
        <View style={[styles.line, { marginTop: sizes.padding }]} />
        <View style={[styles.row, { marginTop: sizes.padding }]}>
          <Text style={styles.textNormal}>{strings.subtotal_produk}</Text>
          <Text
            style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
            totalPrice,
          )}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textNormal}>{strings.subtotal_pengiriman}</Text>
          <Text
            style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
            16000,
          )}`}</Text>
        </View>
        <View style={[styles.row, { marginTop: sizes.padding }]}>
          <Text style={styles.textBold}>{strings.total_pembayaran}</Text>
          <Text style={styles.textBold}>{`Rp ${formatter.formatNumberToCurreny(
            totalPrice + 16000,
          )}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.checkout} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
          paddingHorizontal: sizes.padding,
        }}>
        <Section title={strings.alamat_tujuan}>
          {/**TODO ALAMAT IS EMPTY NEED VALIDATION TELL DIMAS */}
          {alamatList.length > 1 ? (
            <CardAlamat
              item={alamatList[0]}
              onPressUbah={navigateToAlamatScreen}
              isCheckout
            />
          ) : (
            <Text>Daftar Alamat Terlebih Dahulu</Text>
          )}
        </Section>
        <Section>
          {cartItemDataList.map((item, index) => (
            <CheckoutItem key={index} data={item} />
          ))}
        </Section>
        <Section title={strings.pengiriman}>{renderPengiriman()}</Section>
        <Section title={strings.total_pesanan}>{renderTotalPesanan()}</Section>
        <Section title={strings.metode_pembayaran}>
          {renderMetodePembayaran()}
        </Section>
      </ScrollView>
      <Button
        text={strings.proses_pesanan}
        icon={icons.icon_proses_pesanan}
        iconLocation="left"
        onPress={navigateToSelectPayment}
        buttonContainerStyle={styles.buttonStyle}
      />
    </SafeAreaView>
  );
};
export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    padding: sizes.padding,
    marginBottom: sizes.padding,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: colors.bodyTextGrey,
    marginBottom: sizes.padding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconArrow: {
    width: sizes.padding,
    height: sizes.padding,
  },
  textNormal: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.bodyText,
  },
  textSmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.bodyTextLightGrey,
  },
  textHargaPengiriman: {
    fontFamily: 'Inter-Medium',
    color: colors.primary,
    fontSize: 15,
  },
  textBold: { fontFamily: 'Inter-Bold', color: colors.bodyText, fontSize: 16 },
  line: { width: '100%', height: 1, backgroundColor: colors.strokeGrey },
  buttonStyle: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: sizes.padding,
  },
});
