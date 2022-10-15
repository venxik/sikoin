import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, icons, images, sizes } from '../../constants';
import { formatter } from '../../utils';
import { CardVoucherItemProps } from './model';

const CardVoucherItem = (props: CardVoucherItemProps) => {
  const { data, onPress } = props || {};
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <ImageBackground
        borderRadius={sizes.padding}
        source={images.daftar_koperasi_bg}
        style={{
          paddingLeft: sizes.padding,
          paddingRight: sizes.padding * 2,
          paddingVertical: sizes.padding,
        }}
      >
        <Image source={icons.icon_voucher_small} style={{ width: 40, height: 40 }} />
        <Text style={styles.textNominal}>{formatter.formatNumberToCurreny(data)}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardVoucherItem;

const styles = StyleSheet.create({
  textNominal: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.primaryWhite,
  },
});
