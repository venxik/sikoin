/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CurrencyInput from 'react-native-currency-input';
import { TextInput } from 'react-native-gesture-handler';

import { colors, icons, SCREEN_HEIGHT, sizes } from '../../constants';
import { TextInputCurrencyProps } from './model';

const TextInputCurrency = (props: TextInputCurrencyProps) => {
  const { style, textBoxStyle, value = '0', onChangeValue, title, error, errorText } = props || {};
  const [editable, setEditable] = useState(false);

  const input = useRef<TextInput>(null);

  useEffect(() => {
    if (editable) {
      input.current?.focus();
    }
  }, [editable]);

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <CurrencyInput
          {...props}
          value={parseInt(value)}
          onChangeValue={onChangeValue}
          prefix="Rp "
          delimiter="."
          precision={0}
          minValue={0}
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
        <TouchableOpacity onPress={() => setEditable((e) => !e)}>
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
    fontFamily: 'Inter-Medium',
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

export default TextInputCurrency;
