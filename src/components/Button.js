import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';

const Button = props => {
  const {
    style,
    textStyle,
    onPress,
    disabled,
    text,
    icon,
    iconLocation,
    onlyIcon,
  } = props || {};

  const buttonStyle = () => {
    let defaultStyle = { ...styles.defaultContainer, ...style };
    if (disabled) {
      defaultStyle = {
        ...style,
        backgroundColor: colors.strokeGrey,
      };
    }

    return defaultStyle;
  };

  const updateTextStyle = () => {
    let defaultStyle = styles.defaultText;

    if (disabled) {
      defaultStyle = { ...style, ...textStyle, color: colors.black };
    }

    return defaultStyle;
  };

  const checkOnlyIcon = () => {
    if (onlyIcon) {
      return (
        <Image
          source={onlyIcon}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {iconLocation === 'left' ? (
            <Image source={icon} style={{ width: 30, height: 30 }} />
          ) : null}
          <Text style={updateTextStyle()}>{text}</Text>
          {iconLocation === 'right' ? (
            <Image source={icon} style={{ width: 30, height: 30 }} />
          ) : null}
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle()}
      onPress={onPress}
      disabled={disabled}>
      {checkOnlyIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    height: dimensions.SCREEN_HEIGHT * 0.05,
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

export default Button;
