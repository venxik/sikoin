import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, SCREEN_WIDTH, strings } from '../constants';
import PropTypes from 'prop-types';

const MenuHeaderIcon = props => {
  const { menu } = props || {};
  const renderIcon = () => {
    switch (menu) {
      case strings.diskon:
        return icons.icon_diskon;
      default:
        return 0;
    }
  };

  // const renderText = () => {
  //   switch (menu) {
  //     case strings.diskon:
  //       return strings.diskon;
  //     default:
  //       return 0;
  //   }
  // };

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

MenuHeaderIcon.defaultProp = {
  menu: '',
};

export default MenuHeaderIcon;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: { width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3 },
  textStyle: { color: colors.bodyText, fontSize: 34 },
});
