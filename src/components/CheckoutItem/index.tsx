import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, sizes, strings } from '../../constants';
import { formatter } from '../../utils';
import { CheckoutItemProps } from './model';

const CheckoutItem = (props: CheckoutItemProps) => {
  const {
    hargaProduk,
    fotoProduk,
    namaProduk,
    jumlah,
    pilihanVariasiPertama,
    pilihanVariasiKedua,
  } = props.data;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textToko}>{namaToko}</Text> */}
      <View style={styles.mainContainer}>
        <Image source={{ uri: fotoProduk }} style={styles.productImg} />
        <View style={{ marginLeft: sizes.padding, flex: 1 }}>
          <Text style={styles.textProductName}>{namaProduk}</Text>
          {/* <Text style={styles.textVariasi}>{strings.variasi}</Text> */}
          {pilihanVariasiPertama && pilihanVariasiKedua && (
            <Text style={styles.textVariasi}>{strings.variasi}</Text>
          )}
          {pilihanVariasiPertama && (
            <Text style={styles.textVariasiItem}>{`- ${pilihanVariasiPertama}`}</Text>
          )}
          {pilihanVariasiKedua && (
            <Text style={styles.textVariasiItem}>{`- ${pilihanVariasiKedua}`}</Text>
          )}
          {/* {variasi.map((item, index) => (
            <Text key={index} style={styles.textVariasiItem}>
              {`- ${item}`}
            </Text>
          ))} */}
          <View style={{ marginTop: sizes.padding }}>
            <Text style={styles.textPrice}>{`x${jumlah}`}</Text>
            <Text style={styles.textPrice}>{`Rp ${formatter.formatNumberToCurreny(
              hargaProduk,
            )}`}</Text>
            {/* {previousPrice && (
              <Text style={styles.textPrvPrice}>{`Rp ${formatter.formatNumberToCurreny(
                previousPrice,
              )}`}</Text>
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: sizes.padding,
    borderRadius: sizes.padding,
  },
  mainContainer: {
    flexDirection: 'row',
    marginTop: sizes.padding,
    marginLeft: sizes.padding,
  },
  textToko: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: colors.bodyTextGrey,
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
});
