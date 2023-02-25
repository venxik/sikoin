import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Heart } from 'react-native-iconly';

import { colors, SCREEN_HEIGHT, SCREEN_WIDTH, sizes } from '../../constants';
import { formatter } from '../../utils';
import { CardMarketSmallProps } from './model';

const CardMarketSmall = (props: CardMarketSmallProps) => {
  const {
    item,
    onPress,
    style,
    imageHeight = SCREEN_HEIGHT * 0.3,
    onPressWishlist,
  } = props || null;
  const { nama, harga, foto, isFavorit } = item || {};

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <FastImage source={{ uri: foto }} style={[styles.imageStyle, { height: imageHeight }]} />
      <View style={styles.bottomContainer}>
        <View style={{ flex: 0.7 }}>
          <View style={styles.containerStyle}>
            <Text style={styles.titleStyle} numberOfLines={2}>
              {nama}
            </Text>
            <TouchableOpacity onPress={onPressWishlist}>
              <Heart
                style={{
                  width: sizes.icon_size,
                  height: sizes.icon_size,
                }}
                color={colors.primary}
                filled={isFavorit}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.priceContainer}>
            {`Rp ${formatter.formatNumberToCurreny(harga)}`}
          </Text>
        </View>
        {/* 
        <TouchableOpacity onPress={onPressVoucher} style={styles.touchableContainer}>
          <Image source={icons.icon_voucher_small} style={styles.iconVoucher} />
          <Text style={styles.textVoucher}>{strings.voucher_toko}</Text>
          <Image
            source={icons.arrow_right_primary_2}
            style={[styles.iconVoucher, { marginLeft: 4 }]}
          />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default CardMarketSmall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    width: SCREEN_WIDTH * 0.42,
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
    // width: '100%',
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
