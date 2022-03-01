import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';
import { any } from 'react-native/Libraries/Text/TextNativeComponent';

const ButtonText = props => {
  const {
    buttonContainerStyle,
    textStyle,
    onPress,
    disabled,
    text,
    icon,
    iconLocation,
  } = props || {};

  const buttonStyle = () => {
    let defaultStyle = { ...styles.defaultContainer, ...buttonContainerStyle };
    if (disabled) {
      defaultStyle = {
        ...defaultStyle,
        backgroundColor: colors.strokeGrey,
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
          <Image source={icon} style={{ width: 30, height: 30 }} />
        ) : null}
        <Text style={updateTextStyle()}>{text}</Text>
        {iconLocation === 'right' ? (
          <Image source={icon} style={{ width: 30, height: 30 }} />
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
    // height: dimensions.SCREEN_HEIGHT * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: colors.red,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
});

export default ButtonText;
