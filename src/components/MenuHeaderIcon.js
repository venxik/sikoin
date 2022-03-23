import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, images, SCREEN_WIDTH, sizes, strings } from '../constants';
import PropTypes from 'prop-types';

const MenuHeaderIcon = props => {
  const { menu } = props || {};
  const renderIcon = () => {
    switch (menu) {
      case strings.diskon:
        return images.menu_diskon;
      case strings.transaksi:
        return images.menu_transaksi;
      case strings.voucher_center:
        return images.menu_voucher;
      case strings.dokumen:
        return images.menu_dokumen;
      case strings.market:
        return images.menu_market;
      default:
        return 0;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={renderIcon()}
        style={styles.iconStyle}
        resizeMode="cover"
      />
      <Text style={styles.textStyle}>{menu}</Text>
    </View>
  );
};

MenuHeaderIcon.propTypes = {
  menu: PropTypes.string,
};

MenuHeaderIcon.defaultProps = {
  menu: '',
};

export default MenuHeaderIcon;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: { width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.3 },
  textStyle: {
    marginTop: -sizes.padding,
    color: colors.bodyText,
    fontSize: 34,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    width: '60%',
  },
});
