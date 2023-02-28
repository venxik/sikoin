import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../config';
import { colors, sizes, strings } from '../../constants';
import {
  addQtyCart,
  editNotesCart,
  fetchDeleteCartProduct,
  subtractQtyCart,
} from '../../redux/reducers/MarketReducer';
import { formatter } from '../../utils';
import Button from '../Button';
import QtyButton from '../QtyButton';
import { CartItemProps } from './model';

const CartItem = (props: CartItemProps) => {
  const { onPressCheckbox, data } = props;
  const {
    hargaProduk,
    fotoProduk,
    namaProduk,
    catatan,
    pilihanVariasiKedua,
    pilihanVariasiPertama,
    id,
    jumlah,
  } = data;

  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();

  const onPressDelete = () => {
    dispatch(fetchDeleteCartProduct(id));
  };

  const onPressPlus = () => {
    dispatch(addQtyCart(id));
  };

  const onPressMinus = () => {
    if (jumlah && jumlah > 1) {
      dispatch(subtractQtyCart(id));
    }
  };

  const { control } = useForm<{ catatan: string }>({
    defaultValues: {
      catatan: catatan,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tokoContainer}>
        <CheckBox
          disabled={false}
          value={checked}
          onValueChange={(newValue) => {
            setChecked(newValue);
            onPressCheckbox(newValue);
          }}
          tintColors={{ false: colors.primary, true: colors.primary }}
          style={styles.dummyCheck}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: sizes.padding * 1.5 }}>
        <Image source={{ uri: fotoProduk }} style={styles.productImg} />
        <View style={{ marginLeft: sizes.padding, flex: 1 }}>
          <Text style={styles.textProductName}>{namaProduk}</Text>
          <Text style={styles.textPrice}>{`Rp ${formatter.formatNumberToCurreny(
            hargaProduk,
          )}`}</Text>
          {/* {previousPrice && (
            <Text style={styles.textPrvPrice}>{`Rp ${formatter.formatNumberToCurreny(
              previousPrice,
            )}`}</Text>
          )} */}
          {pilihanVariasiPertama && pilihanVariasiKedua && (
            <Text style={styles.textVariasi}>{strings.variasi}</Text>
          )}
          {pilihanVariasiPertama && (
            <Text style={styles.textVariasiItem}>{`- ${pilihanVariasiPertama}`}</Text>
          )}
          {pilihanVariasiKedua && (
            <Text style={styles.textVariasiItem}>{`- ${pilihanVariasiKedua}`}</Text>
          )}
          {/* <Button
            onPress={() => null}
            text={strings.ubah_variasi}
            secondary
            textStyle={{ fontFamily: 'Poppins-SemiBold' }}
            buttonContainerStyle={{
              marginTop: sizes.padding,
              width: '60%',
            }}
          /> */}
          <QtyButton
            style={{ marginTop: sizes.padding }}
            onPressMinus={onPressMinus}
            onPressPlus={onPressPlus}
            qty={jumlah}
          />
        </View>
      </View>
      <View style={styles.line} />
      {/* <TouchableOpacity onPress={props.onPressVoucher} style={styles.touchableContainer}>
        <Image source={icons.icon_voucher_small} style={styles.iconVoucher} />
        <Text style={styles.textBeliDgnVoucher}>{strings.voucher_toko_tersedia}</Text>
        <Image source={icons.arrow_right_primary} style={styles.iconArrow} />
      </TouchableOpacity> */}
      {/* <TextInput
        onChangeText={(e) => setCatatan(e)}
        style={styles.textBox}
        placeholder={'Catatan...'}
        value={catatan}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
        placeholderTextColor={colors.bodyTextLightGrey}
      /> */}
      <Controller
        control={control}
        name="catatan"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={(e) => onChange(e)}
            placeholder="Catatan..."
            placeholderTextColor={colors.bodyTextGrey}
            onEndEditing={() => {
              dispatch(editNotesCart({ id: id, value: value }));
            }}
            style={{
              marginTop: sizes.padding,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.bodyText,
              fontSize: 15,
              fontFamily: 'Inter-Medium',
              color: colors.bodyText,
            }}
          />
        )}
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
export default React.memo(CartItem);

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
    width: 30,
    height: 30,
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
