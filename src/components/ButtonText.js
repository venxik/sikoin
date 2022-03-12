import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, SCREEN_WIDTH } from '../constants';
import PropTypes from 'prop-types';

const ButtonText = props => {
  const {
    buttonContainerStyle,
    textStyle,
    onPress,
    disabled,
    text,
    icon,
    iconLocation,
    shadow,
    secondary,
  } = props || {};

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

  const updateTextStyle = () => {
    let defaultStyle = { ...styles.defaultText, ...textStyle };

    if (disabled) {
      defaultStyle = { ...defaultStyle, color: colors.black };
    }

    if (secondary) {
      defaultStyle = {
        ...defaultStyle,
        color: colors.primary,
      };
    }

    return defaultStyle;
  };

  return (
    <TouchableOpacity
      style={buttonStyle()}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.innerContainer}>
        {iconLocation === 'left' ? (
          <Image
            source={icon}
            style={[styles.iconStyle, { marginRight: 10 }]}
          />
        ) : null}
        <Text style={updateTextStyle()}>{text}</Text>
        {iconLocation === 'right' ? (
          <Image source={icon} style={[styles.iconStyle, { marginLeft: 10 }]} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

ButtonText.propTypes = {
  buttonContainerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.any,
  iconLocation: PropTypes.string,
  shadow: PropTypes.bool,
  secondary: PropTypes.bool,
};

ButtonText.defaultProps = {
  buttonContainerStyle: null,
  textStyle: null,
  onPress: null,
  disabled: false,
  text: '',
  icon: null,
  iconLocation: null,
  shadow: true,
  secondary: false,
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: SCREEN_WIDTH * 0.03,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
  },
});

export default ButtonText;
