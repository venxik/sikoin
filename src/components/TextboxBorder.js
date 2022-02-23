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
