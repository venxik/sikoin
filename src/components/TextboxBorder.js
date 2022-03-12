import React from 'react';
import { View, StyleSheet, Image, TextInput, Text } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';
const TextboxBorder = props => {
  const { style, icon, value, textBoxStyle, onChangeText, error, errorText } =
    props || {};

  return (
    <View>
      <View
        style={[
          styles.defaultContainer,
          style,
          {
            borderColor: error ? colors.red : colors.strokeGrey,
          },
        ]}>
        {icon ? <Image source={icon} style={styles.iconStyle} /> : null}
        <TextInput
          {...props}
          style={[styles.textInputStyle, textBoxStyle]}
          placeholderTextColor={colors.bodyTextGrey}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="always"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      {error && <Text style={styles.textError}>{errorText}</Text>}
    </View>
  );
};

TextboxBorder.propTypes = {
  style: PropTypes.any,
  icon: PropTypes.any,
  value: PropTypes.string,
  textBoxStyle: PropTypes.any,
  onChangeText: PropTypes.func,
  error: PropTypes.object,
  errorText: PropTypes.string,
};

TextboxBorder.defaultProps = {
  style: null,
  icon: null,
  value: null,
  textBoxStyle: null,
  onChangeText: null,
  error: null,
  errorText: '',
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderRadius: 14,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  textInputStyle: { marginHorizontal: 10, color: colors.bodyText },
  iconStyle: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textError: {
    color: colors.red,
    fontSize: 12,
    marginTop: 2,
    marginLeft: 10,
  },
});

export default TextboxBorder;
