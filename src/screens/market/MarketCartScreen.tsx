import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';

import { Button, HeaderBack } from '../../components';
import CartItem from '../../components/CartItem';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import {
  addCartProduct,
  CartProductData,
  CheckoutParamDetails,
  fetchCartData,
  fetchCheckout,
  removeCartProduct,
} from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCartScreen'>;

const MarketCartScreen: React.FC<Props> = () => {
  const { cartData } = useAppSelector((s) => s.MarketReducer);
  const { isLoading } = useAppSelector((s) => s.loading);
  const dispatch = useAppDispatch();

  const selectedCart = useMemo(() => {
    const temp = cartData.keranjang.filter((value) => value.isSelected);
    return temp;
  }, [cartData]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const doCheckout = () => {
    const temp: CheckoutParamDetails[] = selectedCart.map((cart) => {
      return { id: cart.id, jumlah: cart.jumlah, catatan: cart.catatan };
    });
    dispatch(fetchCheckout({ keranjang: temp }));
  };

  const totalPrice = useMemo(() => {
    let temp = 0;
    if (isEmpty(selectedCart)) return 0;
    selectedCart.map((value) => {
      temp += value.hargaProduk * value.jumlah;
    });
    return temp;
  }, [selectedCart]);

  const renderItem = useCallback(
    ({ item }: { item: CartProductData }) => (
      <CartItem
        data={item}
        onPressCheckbox={(status) => {
          if (status) dispatch(addCartProduct(item.id));
          else {
            dispatch(removeCartProduct(item.id));
          }
        }}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.keranjang} />
      <FlatList
        data={cartData.keranjang}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SCREEN_HEIGHT * 0.2,
        }}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Keranjang Kosong</Text>
            </View>
          ) : null
        }
        renderItem={renderItem}
      />
      <View style={styles.btnCheckout}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.textTotalPrice}>Total Harga</Text>
          <Text style={[styles.textTotalPrice, { fontFamily: 'Inter-Regular' }]}>
            Rp {formatter.formatNumberToCurreny(totalPrice)}
          </Text>
        </View>
        <Button
          onPress={doCheckout}
          text={`${strings.checkout} (${cartData.keranjang?.length})`}
          icon={icons.icon_checkout}
          iconLocation={'left'}
          disabled={selectedCart.length < 1}
        />
      </View>
    </SafeAreaView>
  );
};
export default MarketCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnCheckout: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: sizes.padding,
  },
  totalPriceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginBottom: sizes.padding,
    borderRadius: sizes.padding,
  },
  textTotalPrice: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
});
