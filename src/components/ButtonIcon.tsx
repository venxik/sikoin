import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';
import { ButtonIconProps } from './types';

const ButtonIcon: FC<ButtonIconProps> = props => {
  const { buttonContainerStyle, disabled, icon, shadow, secondary } =
    props || {};

  const buttonStyle = () => {
    let defaultStyle = { ...styles.defaultContainer, ...buttonContainerStyle };
    if (disabled) {
      defaultStyle = {
        ...defaultStyle,
        backgroundColor: colors.strokeGrey,
      };
    }
    if (shadow) {
      defaultStyle = {
        ...defaultStyle,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 10,
      };
    }
    if (secondary) {
      defaultStyle = {
        ...defaultStyle,
        backgroundColor: colors.tonalLightPrimary,
      };
    }

    return defaultStyle;
  };

  return (
    <TouchableOpacity {...props} style={buttonStyle()} disabled={disabled}>
      <Image source={icon} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    paddingVertical: SCREEN_WIDTH * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
  iconStyle: {
    width: sizes.padding,
    height: sizes.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonIcon;
