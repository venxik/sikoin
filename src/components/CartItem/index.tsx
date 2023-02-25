import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAppDispatch } from '../../config';
import { colors, icons, sizes, strings } from '../../constants';
import { addCartQty, deleteCartItem, substartCartQty } from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';
import Button from '../Button';
import QtyButton from '../QtyButton';
import { CartItemProps } from './model';

const CartItem = (props: CartItemProps) => {
  const { price, image, namaToko, previousPrice, productName, qty, variasi, id } = props.data;

  const dispatch = useAppDispatch();
  const [catatan, setCatatan] = useState<string>('');

  const onPressPlus = () => {
    dispatch(addCartQty(id));
  };

  const onPressMinus = () => {
    if (qty > 1) {
      dispatch(substartCartQty(id));
    }
  };

  const onPressDelete = () => {
    dispatch(deleteCartItem(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tokoContainer}>
        <View style={styles.dummyCheck}></View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: sizes.padding * 1.5 }}>
        <Image source={{ uri: image }} style={styles.productImg} />
        <View style={{ marginLeft: sizes.padding, flex: 1 }}>
          <Text style={styles.textProductName}>{productName}</Text>
          <Text style={styles.textPrice}>{`Rp ${formatter.formatNumberToCurreny(price)}`}</Text>
          {previousPrice && (
            <Text style={styles.textPrvPrice}>{`Rp ${formatter.formatNumberToCurreny(
              previousPrice,
            )}`}</Text>
          )}
          <Text style={styles.textVariasi}>{strings.variasi}</Text>
          {variasi.map((item, index) => (
            <Text key={index} style={styles.textVariasiItem}>
              {`- ${item}`}
            </Text>
          ))}
          <Button
            onPress={() => null}
            text={strings.ubah_variasi}
            secondary
            textStyle={{ fontFamily: 'Poppins-SemiBold' }}
            buttonContainerStyle={{
              marginTop: sizes.padding,
              width: '60%',
            }}
          />
          <QtyButton
            style={{ marginTop: sizes.padding }}
            onPressMinus={onPressMinus}
            onPressPlus={onPressPlus}
            qty={qty}
          />
        </View>
      </View>
      <View style={styles.line} />
      {/* <TouchableOpacity onPress={props.onPressVoucher} style={styles.touchableContainer}>
        <Image source={icons.icon_voucher_small} style={styles.iconVoucher} />
        <Text style={styles.textBeliDgnVoucher}>{strings.voucher_toko_tersedia}</Text>
        <Image source={icons.arrow_right_primary} style={styles.iconArrow} />
      </TouchableOpacity> */}
      <TextInput
        onChangeText={(e) => setCatatan(e)}
        style={styles.textBox}
        placeholder={'Catatan...'}
        value={catatan}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
        placeholderTextColor={colors.bodyTextLightGrey}
      />
      <Button
        onPress={onPressDelete}
        secondary
        text={strings.hapus}
        buttonContainerStyle={{ marginTop: sizes.padding }}
      />
    </View>
  );
};
export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginBottom: sizes.padding,
    marginHorizontal: sizes.padding,
    borderRadius: sizes.padding,
  },
  dummyCheck: {
    width: 20,
    height: 20,
    borderColor: colors.bodyText,
    borderWidth: 2,
    borderRadius: 4,
  },
  tokoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textToko: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: colors.bodyTextGrey,
    marginLeft: 14,
  },
  productImg: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  textProductName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: colors.bodyText,
  },
  textPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.bodyText,
    marginTop: 10,
  },
  textPrvPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.bodyText,
    textDecorationLine: 'line-through',
  },
  textVariasi: {
    marginTop: sizes.padding,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyTextLightGrey,
  },
  textVariasiItem: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyTextGrey,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.strokeGrey,
    marginTop: sizes.padding,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.padding,
  },
  textBeliDgnVoucher: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  iconArrow: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginLeft: 6,
  },
  iconVoucher: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textBox: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeGrey,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    alignSelf: 'center',
    marginTop: 10,
  },
});
