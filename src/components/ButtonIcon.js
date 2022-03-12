import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';

const ButtonIcon = props => {
  const { buttonContainerStyle, onPress, disabled, icon, shadow } = props || {};

  const buttonStyle = () => {
    let defaultStyle = { ...styles.defaultContainer, ...buttonContainerStyle };
    if (disabled) {
      defaultStyle = {
        ...buttonContainerStyle,
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

    return defaultStyle;
  };

  return (
    <TouchableOpacity
      style={buttonStyle()}
      onPress={onPress}
      disabled={disabled}>
      <Image source={icon} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

ButtonIcon.propTypes = {
  buttonContainerStyle: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
};

ButtonIcon.defaultProps = {
  buttonContainerStyle: null,
  onPress: null,
  disabled: false,
  icon: null,
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
