import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { colors, icons, sizes, strings } from '../../constants';
import { DropdownFormProps } from './model';

const DropdownForm = (props: DropdownFormProps) => {
  const { title, style, error, errorText, data, onChange, value, maxHeight } = props || {};

  const dropdown = () => (
    <Dropdown
      {...props}
      style={[styles.dropdown, error && { borderColor: 'red', borderWidth: 1 }]}
      containerStyle={styles.dropdownItemContainer}
      placeholderStyle={styles.textValue}
      selectedTextStyle={styles.textValue}
      renderRightIcon={() => (
        <Image
          source={icons.icon_dropdown}
          style={{ width: sizes.padding, height: sizes.padding }}
        />
      )}
      data={data}
      onChange={(item) => onChange(item?.value)}
      value={value}
      maxHeight={maxHeight ? maxHeight : 120}
      labelField="label"
      valueField="value"
      placeholder={strings.pilih_dot}
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
