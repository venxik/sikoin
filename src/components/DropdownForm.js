import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, sizes, strings } from '../constants';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownForm = props => {
  const {
    style,
    title,
    items,
    setItems,
    openId,
    id,
    setOpenId,
    onChange,
    existsValue,
  } = props || {};
  const [value, setValue] = useState(existsValue);

  const setOpen = useCallback(open => {
    setOpenId(open ? id : null);
  }, []);

  const dropdown = () => (
    <DropDownPicker
      style={styles.dropdown}
      open={openId === id}
      setOpen={setOpen}
      placeholder={strings.pilih_dot}
      onChangeValue={() => onChange(value)}
      listMode="SCROLLVIEW"
      value={value}
      items={items}
      setValue={setValue}
      setItems={setItems}
      itemSeparator={true}
      showTickIcon={false}
      placeholderStyle={styles.textValue}
      dropDownDirection="BOTTOM"
      ArrowDownIconComponent={() => (
        <Image
          source={icons.icon_dropdown}
          style={{ width: sizes.padding, height: sizes.padding }}
        />
      )}
      dropDownContainerStyle={styles.dropdownItemContainer}
      itemSeparatorStyle={{
        height: 0.5,
        backgroundColor: colors.primary,
      }}
      listItemLabelStyle={[styles.textValue, { fontWeight: '600' }]}
      labelStyle={styles.textValue}
    />
  );

  if (title) {
    return (
      <View style={[styles.defaultContainer, style]}>
        <Text style={styles.titleText}>{title}</Text>
        {dropdown()}
      </View>
    );
  }
  return dropdown();
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
  defaultContainer: {
    marginBottom: sizes.padding,
  },
  titleText: { color: colors.bodyTextGrey, marginBottom: sizes.padding / 2 },
  textValue: {
    color: colors.primary,
    fontWeight: '500',
  },
  dropdown: {
    backgroundColor: colors.tonalLightPrimary,
    borderWidth: 0,
    borderRadius: sizes.padding / 1.5,
  },
  dropdownItemContainer: {
    backgroundColor: colors.tonalLightPrimary,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
});
