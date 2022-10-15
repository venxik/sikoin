import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, images, SCREEN_WIDTH, strings } from '../../constants';
import { MenuHeaderIconProps } from './model';

const MenuHeaderIcon = (props: MenuHeaderIconProps) => {
  const { menu, title, style } = props;
  const renderIcon = () => {
    switch (menu) {
      case strings.diskon:
        return images.menu_diskon;
      case strings.mutasi:
        return images.menu_transaksi;
      case strings.voucher_center:
        return images.menu_voucher;
      case strings.dokumen:
        return images.menu_dokumen;
      case strings.market:
        return images.menu_market;
      case strings.saldo:
        return images.img_saldo_icon;
      case strings.simpanan:
        return images.img_simpanan_icon;
      case strings.kabar:
        return images.menu_kabar;
      case strings.promo:
        return images.menu_kabar;
      default:
        return 0;
    }
  };

  return (
    <View style={[styles.container, { ...style }]}>
      <Image source={renderIcon()} style={styles.iconStyle} resizeMode="contain" />
      <Text style={styles.textStyle}>{title ? title : menu}</Text>
    </View>
  );
};

export default MenuHeaderIcon;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: { width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.3 },
  textStyle: {
    // marginTop: -sizes.padding,
    color: colors.bodyText,
    fontSize: 34,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    width: '60%',
  },
});
