import React, { FC } from 'react';
import { View, StyleSheet, Image, TextInput, Text } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../../constants';
import { TextInputBorderProps } from './model';

const TextInputBorder: FC<TextInputBorderProps> = props => {
  const { style, icon, textBoxStyle, error, errorText } = props || {};

  return (
    <View style={style}>
      <View
        style={[
          styles.defaultContainer,
          {
            borderColor: error ? colors.red : colors.strokeGrey,
          },
          style,
        ]}>
        {icon ? (
          <Image resizeMode="contain" source={icon} style={styles.iconStyle} />
        ) : null}
        <TextInput
          {...props}
          style={[styles.textInputStyle, textBoxStyle]}
          placeholderTextColor={colors.bodyTextGrey}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="always"
        />
      </View>
      {error && <Text style={styles.textError}>{errorText}</Text>}
    </View>
  );
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
  textInputStyle: {
    flex: 1,
    marginHorizontal: 10,
    color: colors.bodyText,
    fontFamily: 'Inter-Regular',
  },
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

export default TextInputBorder;
