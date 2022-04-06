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
import { CardMarketLargeProps } from './model';
import { formatter } from '../../utils';

const CardMarketLarge = (props: CardMarketLargeProps) => {
  const { item, onPress, style, onPressWishlist, onPressVoucher } =
    props || null;
  const { productName, price, image } = item || {};
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <FastImage source={{ uri: image }} style={styles.imageStyle} />
      <View style={styles.bottomContainer}>
        <View style={{ flex: 0.7 }}>
          <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>{productName}</Text>
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
          <Text style={styles.textBeliDgnVoucher}>
            {strings.beli_dgn_voucher}
          </Text>
          <Image source={icons.arrow_right_primary} style={styles.iconArrow} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardMarketLarge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    width: SCREEN_WIDTH * 0.8,
    marginRight: sizes.padding,
  },
  imageStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.5,
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
    fontSize: 16,
    color: colors.bodyText,
    flex: 0.8,
    fontFamily: 'Poppins-Medium',
  },
  priceContainer: {
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Inter-Bold',
  },
  touchableContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textBeliDgnVoucher: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  iconArrow: {
    width: sizes.padding,
    height: sizes.padding,
    marginLeft: 6,
  },
  iconVoucher: {
    width: 30,
    height: 30,
    marginRight: sizes.padding,
  },
});
