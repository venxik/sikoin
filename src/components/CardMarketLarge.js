import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, sizes, strings } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const CardMarketLarge = props => {
  const { item, onPress, style, onPressWishlist } = props || null;
  const { productName, price, image } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Image source={image} style={styles.imageStyle} />
      <View style={{ padding: sizes.padding, marginTop: '100%' }}>
        <View style={styles.containerStyle}>
          <Text style={styles.titleStyle}>{productName}</Text>
          <TouchableOpacity onPress={onPressWishlist}>
            <Image
              source={icons.icon_wishlist}
              style={{
                width: dimensions.ICON_SIZE,
                height: dimensions.ICON_SIZE,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.priceContainer}>{price}</Text>

        <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
          <Image
            source={icons.icon_voucher_small}
            style={{
              width: 30,
              height: 30,
              marginRight: sizes.padding,
            }}
          />
          <Text
            style={{ color: colors.primary, fontWeight: '600', fontSize: 13 }}>
            {strings.beli_dgn_voucher}
          </Text>
          <Image
            source={icons.arrow_right_primary}
            style={{
              width: sizes.padding,
              height: sizes.padding,
              marginLeft: 6,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CardMarketLarge.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
  onPressWishlist: PropTypes.func,
};

CardMarketLarge.defaultProp = {
  item: null,
  onPress: null,
  style: null,
  onPressWishlist: null,
};

export default CardMarketLarge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    width: dimensions.SCREEN_WIDTH * 0.8,
    marginRight: sizes.padding,
  },
  imageStyle: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '65%',
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleStyle: { fontSize: 16, color: colors.bodyText, flex: 0.8 },
  priceContainer: { marginTop: 10, fontSize: 24, color: colors.bodyText },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
