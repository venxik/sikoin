import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { colors, icons, sizes, strings } from '../../constants';
import { DropdownFormProps } from './model';

const DropdownForm = (props: DropdownFormProps) => {
  const {
    title,
    style,
    error,
    errorText,
    data,
    onChange,
    value,
    maxHeight,
    labelField = 'label',
    valueField = 'value',
    disable,
  } = props || {};

  // const disable = true;

  const dropdown = () => (
    <Dropdown
      {...props}
      style={[
        styles.dropdown,
        {
          borderColor: error ? 'red' : undefined,
          borderWidth: error ? 1 : 0,
          // backgroundColor: disable ? colors.bodyTextLightGrey : colors.tonalPrimary,
        },
      ]}
      containerStyle={styles.dropdownItemContainer}
      placeholderStyle={styles.textValue}
      selectedTextStyle={styles.textValue}
      activeColor={colors.tonalPrimary}
      renderRightIcon={() => (
        <Image
          source={icons.icon_dropdown}
          style={{ width: sizes.padding, height: sizes.padding }}
        />
      )}
      data={data}
      onChange={(item) => {
        onChange(item[valueField]);
      }}
      value={value}
      maxHeight={maxHeight || 120}
      labelField={labelField}
      valueField={valueField}
      placeholder={strings.pilih_dot}
      showsVerticalScrollIndicator
      disable={disable}
    />
  );

  if (title) {
    return (
      <View style={style}>
        <Text style={styles.titleText}>{title}</Text>
        {dropdown()}
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
  }
  return <View style={[style, { marginTop: sizes.padding }]}>{dropdown()}</View>;
};

export default DropdownForm;

const styles = StyleSheet.create({
  titleText: {
    color: colors.bodyTextGrey,
    fontFamily: 'Poppins-Regular',
  },
  errorText: { color: colors.red, fontSize: 12 },
  textValue: {
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },
  dropdown: {
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: sizes.padding / 1.5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownItemContainer: {
    backgroundColor: colors.tonalLightPrimary,
    borderWidth: 0.5,
    borderRadius: sizes.padding,
  },
});
