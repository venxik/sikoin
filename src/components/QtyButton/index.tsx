import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, icons, sizes } from '../../constants';
import { QtyButtonProps } from './model';

const QtyButton = (props: QtyButtonProps) => {
  const { onPressMinus, onPressPlus, qty, style, min = 1, max = 10 } = props;
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPressMinus}
        style={[
          styles.plusMinusContainer,
          {
            borderColor: qty <= min ? colors.bodyTextLightGrey : colors.primary,
          },
        ]}
      >
        <Image source={icons.minus_shape} style={styles.plusMinusIcon} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.textQtyContainer}>
        <Text style={styles.textJumlahHarga}>{qty}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressPlus}
        style={[
          styles.plusMinusContainer,
          {
            borderColor: qty >= max ? colors.bodyTextLightGrey : colors.primary,
          },
        ]}
      >
        <Image source={icons.plus_shape} style={styles.plusMinusIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default QtyButton;

const styles = StyleSheet.create({
  plusMinusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  plusMinusIcon: { width: 20, height: 20 },
  textQtyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 6,
    borderColor: colors.strokeDarkGrey,
    paddingHorizontal: sizes.padding * 1.3,
    marginHorizontal: sizes.padding / 2,
  },
  textJumlahHarga: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
});
