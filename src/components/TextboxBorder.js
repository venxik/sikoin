import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';
const TextboxBorder = props => {
  const {
    style,
    disabled,
    icon,
    value,
    textBoxStyle,
    secureTextEntry,
    placeholder,
    onChangeText,
  } = props || {};

  return (
    <View style={[styles.defaultContainer, style]}>
      {icon ? <Image source={icon} style={{ width: 30, height: 30 }} /> : null}
      <TextInput
        style={textBoxStyle}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

TextboxBorder.propTypes = {
  style: PropTypes.any,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  value: PropTypes.string,
  textBoxStyle: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

TextboxBorder.defaultProp = {
  style: null,
  disabled: false,
  icon: null,
  value: null,
  textBoxStyle: null,
  secureTextEntry: false,
  placeholder: null,
  onChangeText: null,
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    height: dimensions.SCREEN_HEIGHT * 0.06,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.strokeGrey,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
});

export default TextboxBorder;
