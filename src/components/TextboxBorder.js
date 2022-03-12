import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';
const TextboxBorder = props => {
  const { style, icon, value, textBoxStyle, placeholder, onChangeText } =
    props || {};

  return (
    <View style={[styles.defaultContainer, style]}>
      {icon ? <Image source={icon} style={styles.iconStyle} /> : null}
      <TextInput
        {...props}
        style={[styles.textInputStyle, textBoxStyle]}
        placeholderTextColor={colors.bodyTextGrey}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
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
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  keyboardType: PropTypes.string,
};

TextboxBorder.defaultProps = {
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
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.strokeGrey,
  },
  textInputStyle: { marginLeft: 10, color: colors.bodyText },
  iconStyle: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
});

export default TextboxBorder;
