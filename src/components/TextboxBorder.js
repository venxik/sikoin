import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';
const TextboxBorder = props => {
  const {
    style,
    icon,
    value,
    textBoxStyle,
    secureTextEntry,
    placeholder,
    onChangeText,
    editable,
    multiline,
    keyboardType,
  } = props || {};

  return (
    <View style={[styles.defaultContainer, style]}>
      {icon ? (
        <Image
          source={icon}
          style={{
            width: dimensions.ICON_SIZE,
            height: dimensions.ICON_SIZE,
          }}
        />
      ) : null}
      <TextInput
        style={[{ marginLeft: 10 }, textBoxStyle]}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
        keyboardType={keyboardType}
        editable={editable}
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
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  keyboardType: PropTypes.string,
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
  editable: true,
  multiline: true,
  keyboardType: null,
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    paddingHorizontal: dimensions.SCREEN_WIDTH * 0.04,
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
