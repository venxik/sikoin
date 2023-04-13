import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';

import {
  Button,
  CheckoutAddress,
  CheckoutDeliveryItem,
  CheckoutItem,
  CheckoutPaymentItem,
  HeaderBack,
  Popup1Button,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';
import {
  DeliveryData,
  fetchOrderProcess,
  PaymentDetails,
} from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCheckoutScreen'>;

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

const MarketCheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { checkoutData, selectedAlamat } = useAppSelector((s) => s.MarketReducer);
  const { alamat, keranjang, metodePembayaran, pengiriman, totalBarang } = checkoutData;

  const dispatch = useAppDispatch();

  const [bottomSheetTab, setBottomSheetTab] = useState<'pembayaran' | 'pengiriman'>('pembayaran');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryData>({
    code: '',
    cost: 0,
    etd: '',
    note: '',
    service: '',
  });
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  useEffect(() => {
    setSelectedDelivery(pengiriman[0]);
  }, [pengiriman]);

  const totalPrice = useMemo(
    () => totalBarang + selectedDelivery.cost,
    [selectedDelivery, totalBarang],
  );

  const navigateToAlamatScreen = () => {
    navigation.navigate('MarketChangeAddressScreen');
  };

  const navigateToSelectPayment = () => {
    if (selectedPaymentMethodId !== 0) {
      const index = metodePembayaran.koperasi.findIndex((v) => v.id === selectedPaymentMethodId);
      if (index !== -1) {
        const saldoKoperasi = metodePembayaran.koperasi[index].saldo;
        if (saldoKoperasi && saldoKoperasi <= totalPrice) {
          setShowFailedPopup(true);
        } else {
          setShowPopup(true);
        }
      }
    } else {
      setShowPopup(true);
    }
  };

  const orderProcess = () => {
    dispatch(
      fetchOrderProcess({
        alamatId: selectedAlamat.id,
        keranjangId: keranjang.map((v) => v.keranjangId as number),
        metodePembayaranId: selectedPaymentMethodId,
        pengiriman: selectedDelivery,
        totalBarangDanOngkir: totalPrice,
      }),
    );
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
    [],
  );

  const renderPengiriman = useMemo(() => {
    const { cost, service, etd } = selectedDelivery;
    return (
      <View style={[styles.row]}>
        <View style={{ width: '70%' }}>
          <Text style={styles.textNormal}>{service}</Text>
          <Text style={[styles.textSmall, { marginTop: 4 }]}>
            {`Barang akan diterima dalam waktu ${etd} hari`}
          </Text>
        </View>
        <Pressable
          style={[styles.row, { justifyContent: 'flex-end' }]}
          onPress={() => {
            setBottomSheetTab('pengiriman');
            sheetRef.current?.snapToIndex(0);
          }}
        >
          <Text style={styles.textHargaPengiriman}>
            {`Rp ${formatter.formatNumberToCurreny(cost)}`}
          </Text>
          <Image source={icons.arrow_right_primary_2} style={styles.iconArrow} />
        </Pressable>
      </View>
    );
  }, [setBottomSheetTab, selectedDelivery]);

  const renderTotalPesanan = useMemo(() => {
    return (
      <View style={styles.row}>
        <Text style={styles.textNormal}>{`${keranjang.length} Produk`}</Text>
        <Text style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
          totalBarang,
        )}`}</Text>
      </View>
    );
  }, [keranjang, totalBarang]);

  const renderMetodePembayaran = useMemo(() => {
    let payment: PaymentDetails = { id: 0, nama: '', info: '', saldo: 0 };
    if (selectedPaymentMethodId === 0) {
      payment = metodePembayaran.bank;
    } else {
      const koperasiIndex = metodePembayaran.koperasi.findIndex(
        (item) => item.id === selectedPaymentMethodId,
      );
      payment = metodePembayaran.koperasi[koperasiIndex];
    }

    const text = `${payment.nama} ${selectedPaymentMethodId === 0 ? payment.info : ''}`;

    return (
      <View>
        <Pressable
          style={[styles.row, { maxWidth: '80%' }]}
          onPress={() => {
            setBottomSheetTab('pembayaran');
            sheetRef.current?.snapToIndex(0);
          }}
        >
          <Text style={styles.textHargaPengiriman}>{text}</Text>
          <Image source={icons.arrow_right_primary_2} style={styles.iconArrow} />
        </Pressable>
        <View style={[styles.line, { marginTop: sizes.padding }]} />
        <View style={[styles.row, { marginTop: sizes.padding }]}>
          <Text style={styles.textNormal}>{strings.subtotal_produk}</Text>
          <Text style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
            totalBarang,
          )}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textNormal}>{strings.subtotal_pengiriman}</Text>
          <Text style={styles.textNormal}>{`Rp ${formatter.formatNumberToCurreny(
            selectedDelivery.cost,
          )}`}</Text>
        </View>
        <View style={[styles.row, { marginTop: sizes.padding }]}>
          <Text style={styles.textBold}>{strings.total_pembayaran}</Text>
          <Text style={styles.textBold}>{`Rp ${formatter.formatNumberToCurreny(totalPrice)}`}</Text>
        </View>
      </View>
    );
  }, [
    selectedPaymentMethodId,
    metodePembayaran,
    totalBarang,
    selectedDelivery,
    totalPrice,
    setBottomSheetTab,
  ]);

  const renderDeliveryItem = useCallback(
    ({ item }) => (
      <CheckoutDeliveryItem
        data={item}
        isSelected={JSON.stringify(selectedDelivery) === JSON.stringify(item)}
        onPress={(value) => setSelectedDelivery(value)}
      />
    ),
    [selectedDelivery, setSelectedDelivery],
  );

  const renderPaymentItem = useCallback(
    ({ item }: { item: PaymentDetails }) => (
      <CheckoutPaymentItem
        data={item}
        isSelected={selectedPaymentMethodId === item.id}
        onPress={() => setSelectedPaymentMethodId(item.id)}
      />
    ),
    [selectedPaymentMethodId, setSelectedPaymentMethodId],
  );

  const renderBottomSheet = () => {
    if (bottomSheetTab === 'pembayaran') {
      const merge: PaymentDetails[] = [metodePembayaran.bank, ...metodePembayaran.koperasi];
      return (
        <View style={{ flex: 1 }}>
          <HeaderBack title={'Pilih Metode Pembayaran'} onPress={() => sheetRef.current?.close()} />
          <BottomSheetFlatList
            data={merge}
            renderItem={renderPaymentItem}
            contentContainerStyle={{ marginBottom: sizes.padding * 2 }}
          />
          <Button
            onPress={() => sheetRef.current?.close()}
            text="Pilih"
            buttonContainerStyle={{
              marginHorizontal: sizes.padding * 1.5,
              marginVertical: sizes.padding,
            }}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <HeaderBack title={'Pengiriman'} onPress={() => sheetRef.current?.close()} />
        <BottomSheetFlatList
          data={pengiriman}
          renderItem={renderDeliveryItem}
          contentContainerStyle={{ marginBottom: sizes.padding * 2 }}
          ListHeaderComponent={
            <Text
              style={{
                color: colors.bodyText,
                marginLeft: sizes.padding * 2,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              Pilih Pengiriman & Kurir
            </Text>
          }
        />
        <Button
          onPress={() => sheetRef.current?.close()}
          text="Pilih"
          buttonContainerStyle={{
            marginHorizontal: sizes.padding * 1.5,
            marginVertical: sizes.padding,
          }}
        />
      </View>
    );
  };

  const renderPopupContinue = useMemo(() => {
    return (
      <Popup1Button
        headerText={'Anda akan melakukan transaksi pembelian'}
        contentText={
          'Pastikan Anda sudah memeriksa kembali detail transaksi Anda. Apakah Anda ingin melanjutkan transaksi ini?'
        }
        showPopup={showPopup}
        onPress={() => {
          orderProcess();
          setShowPopup(false);
        }}
        headerImage={icons.icon_info_popup}
        customButtonText={'Lanjut'}
      />
    );
  }, [showPopup]);

  const renderPopupAmountNotEnough = useMemo(() => {
    return (
      <Popup1Button
        headerText={'Maaf, saldo koperasi anda kurang dari total belanja anda'}
        showPopup={showFailedPopup}
        onPress={() => setShowFailedPopup(false)}
        headerImage={icons.popup_failed}
        customButtonText={'Tutup'}
      />
    );
  }, [showFailedPopup, setShowFailedPopup]);

  return (
    <SafeAreaView style={styles.container}>
      {renderPopupContinue}
      {renderPopupAmountNotEnough}
      <HeaderBack title={strings.checkout} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
          paddingHorizontal: sizes.padding,
        }}
      >
        <Section title={strings.alamat_tujuan}>
          {alamat.length > 1 ? (
            <CheckoutAddress item={selectedAlamat} onPressUbah={navigateToAlamatScreen} />
          ) : (
            <Text>Daftar Alamat Terlebih Dahulu</Text>
          )}
        </Section>
        <Section>
          {keranjang.map((item, index) => (
            <CheckoutItem key={index} data={item} />
          ))}
        </Section>
        <Section title={strings.pengiriman}>{renderPengiriman}</Section>
        <Section title={strings.total_pesanan}>{renderTotalPesanan}</Section>
        <Section title={strings.metode_pembayaran}>{renderMetodePembayaran}</Section>
      </ScrollView>
      <Button
        text={strings.proses_pesanan}
        icon={icons.icon_proses_pesanan}
        iconLocation="left"
        onPress={navigateToSelectPayment}
        buttonContainerStyle={styles.buttonStyle}
      />
      <BottomSheet
        style={{ backgroundColor: colors.primaryWhite }}
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        {renderBottomSheet()}
      </BottomSheet>
    </SafeAreaView>
  );
};
export default MarketCheckoutScreen;

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
