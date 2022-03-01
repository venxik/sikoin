import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';
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

    return defaultStyle;
  };

  const updateTextStyle = () => {
    let defaultStyle = { ...styles.defaultText, ...textStyle };

    if (disabled) {
      defaultStyle = { ...defaultStyle, color: colors.black };
    }

    return defaultStyle;
  };

  return (
    <TouchableOpacity
      style={buttonStyle()}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {iconLocation === 'left' ? (
          <Image
            source={icon}
            style={{
              marginRight: 10,
              width: dimensions.SCREEN_WIDTH * 0.05,
              height: dimensions.SCREEN_WIDTH * 0.05,
            }}
          />
        ) : null}
        <Text style={updateTextStyle()}>{text}</Text>
        {iconLocation === 'right' ? (
          <Image
            source={icon}
            style={{
              marginLeft: 10,
              width: dimensions.SCREEN_WIDTH * 0.05,
              height: dimensions.SCREEN_WIDTH * 0.05,
            }}
          />
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
};

ButtonText.defaultProp = {
  buttonContainerStyle: null,
  textStyle: null,
  onPress: null,
  disabled: false,
  text: '',
  icon: null,
  iconLocation: null,
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
});

export default ButtonText;
