import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, sizes, strings } from '../constants';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownFormProps } from './types';

const DropdownForm = (props: DropdownFormProps) => {
  const { title, style, error, errorText } = props || {};

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
  return (
    <View style={[style, { marginTop: sizes.padding }]}>{dropdown()}</View>
  );
};

DropdownForm.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.any,
  title: PropTypes.string,
  style: PropTypes.object,
  openId: PropTypes.string,
  id: PropTypes.string,
  setOpenId: PropTypes.any,
  onChange: PropTypes.func,
  existsValue: PropTypes.string,
};

DropdownForm.defaultProps = {
  value: null,
  onPress: null,
  icon: null,
  title: null,
  style: null,
  onOpen: null,
  openId: '',
  id: '',
  setOpenId: null,
  onChange: null,
  existsValue: '',
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
    fontSize: 14,
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
