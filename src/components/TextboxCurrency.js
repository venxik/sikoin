import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, SCREEN_HEIGHT, sizes } from '../constants';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-native-currency-input';

const TextboxCurrency = props => {
  const { style, textBoxStyle, value, onChangeText, title, error, errorText } =
    props || {};
  const [editable, setEditable] = useState(false);

  const input = useRef(null);

  useEffect(() => {
    if (editable) {
      input.current.focus();
    }
  }, [editable]);

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <CurrencyInput
          {...props}
          value={value}
          onChangeValue={onChangeText}
          prefix="Rp "
          delimiter="."
          precision={0}
          onChangeText={() => {}}
          style={[
            styles.textBox,
            {
              ...textBoxStyle,
              color: editable ? colors.bodyText : colors.bodyTextLightGrey,
              borderBottomColor: error
                ? colors.red
                : editable
                ? colors.bodyText
                : colors.bodyTextLightGrey,
            },
          ]}
          ref={input}
          autoCorrect={false}
          editable={editable}
        />
        <TouchableOpacity onPress={() => setEditable(e => !e)}>
          <Image
            source={icons.edit_textbox}
            style={{
              width: sizes.icon_size,
              height: sizes.icon_size,
            }}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.textError}>{errorText}</Text>}
    </View>
  );
};

TextboxCurrency.propTypes = {
  style: PropTypes.any,
  value: PropTypes.number,
  textBoxStyle: PropTypes.any,
  onChangeText: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.object,
  errorText: PropTypes.string,
};

TextboxCurrency.defaultProps = {
  style: null,
  value: 0,
  textBoxStyle: null,
  onChangeText: null,
  title: 'Title',
  error: null,
  errorText: '',
};

const styles = StyleSheet.create({
  defaultContainer: {
    minHeight: SCREEN_HEIGHT * 0.06,
    backgroundColor: colors.white,
    marginBottom: sizes.padding,
  },
  textBox: {
    width: '85%',
    borderBottomWidth: 1,
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
  textError: { color: colors.red, fontSize: 12, marginTop: 2 },
});

export default TextboxCurrency;
