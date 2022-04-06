import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import FastImage from 'react-native-fast-image';
import { CardMarketSmallProps } from './model';
import { formatter } from '../../utils';

const CardMarketSmall = (props: CardMarketSmallProps) => {
  const { item, onPress, style, onPressWishlist, onPressVoucher } =
    props || null;
  const { productName, price, image } = item || {};
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <FastImage source={{ uri: image }} style={styles.imageStyle} />
      <View style={styles.bottomContainer}>
        <View style={{ flex: 0.7 }}>
          <View style={styles.containerStyle}>
            <Text style={styles.titleStyle} numberOfLines={2}>
              {productName}
            </Text>
            <TouchableOpacity onPress={onPressWishlist}>
              <Image
                source={icons.icon_wishlist}
                style={{
                  width: sizes.icon_size,
                  height: sizes.icon_size,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.priceContainer}>
            {`Rp ${formatter.formatNumberToCurreny(price)}`}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onPressVoucher}
          style={styles.touchableContainer}>
          <Image source={icons.icon_voucher_small} style={styles.iconVoucher} />
          <Text style={styles.textVoucher}>{strings.voucher_toko}</Text>
          <Image
            source={icons.arrow_right_primary_2}
            style={[styles.iconVoucher, { marginLeft: 4 }]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardMarketSmall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    width: SCREEN_WIDTH * 0.45,
    marginRight: sizes.padding,
  },
  imageStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
  },
  bottomContainer: {
    flex: 1,
    padding: sizes.padding,
    width: '100%',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleStyle: {
    fontSize: 13,
    color: colors.bodyText,
    flex: 0.8,
    fontFamily: 'Poppins-Medium',
  },
  priceContainer: {
    fontSize: 16,
    color: colors.bodyText,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  touchableContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  iconVoucher: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginRight: 4,
  },
  textVoucher: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
});
