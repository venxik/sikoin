import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { colors, icons, SCREEN_HEIGHT, sizes } from '../constants';
import PropTypes from 'prop-types';

const TextboxForm = props => {
  const {
    style,
    textBoxStyle,
    value,
    secureTextEntry,
    onChangeText,
    title,
    editable,
    multiline,
    placeholder,
    keyboardType,
  } = props || {};

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <TextInput
          {...props}
          style={[styles.textBox, { ...textBoxStyle }]}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="always"
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          editable={editable}
          onChangeText={onChangeText}
          value={value}
          multiline={multiline}
          keyboardType={keyboardType}
        />
        <Image
          source={icons.edit_textbox}
          style={{
            width: sizes.icon_size,
            height: sizes.icon_size,
          }}
        />
      </View>
    </View>
  );
};

TextboxForm.propTypes = {
  style: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  textBoxStyle: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  keyboardType: PropTypes.string,
};

TextboxForm.defaultProp = {
  style: null,
  disabled: false,
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
    minHeight: SCREEN_HEIGHT * 0.06,
    backgroundColor: colors.white,
    marginBottom: sizes.padding,
  },
  textBox: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeGrey,
    color: colors.bodyText,
    fontSize: 15,
    fontWeight: '500',
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: { color: colors.bodyTextGrey },
});

export default TextboxForm;
