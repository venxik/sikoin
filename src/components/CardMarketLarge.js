import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, strings } from '../constants';
import { dimensions } from '../utils';

const CardMarketLarge = props => {
  const { item, onPress, style, onPressWishlist } = props || null;
  const { productName, price, image } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Image
        source={image}
        style={{
          ...StyleSheet.absoluteFill,
          width: '100%',
          height: '65%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View style={{ padding: 20, marginTop: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{ fontSize: 16, color: colors.bodyText, flex: 0.8 }}>
            {productName}
          </Text>
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

        <Text style={{ marginTop: 10, fontSize: 24, color: colors.bodyText }}>
          {price}
        </Text>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image
            source={icons.icon_voucher_small}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text
            style={{ color: colors.primary, fontWeight: '600', fontSize: 13 }}>
            {strings.beli_dgn_voucher}
          </Text>
          <Image
            source={icons.arrow_right_primary}
            style={{
              width: 20,
              height: 20,
              marginLeft: 6,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CardMarketLarge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: dimensions.SCREEN_WIDTH * 0.8,
    marginRight: 20,
  },
});
