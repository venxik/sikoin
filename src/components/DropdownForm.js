import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, sizes } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const DropdownForm = props => {
  const { onPress, customText, icon, style } = props || {};
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {icon ? (
          <Image
            source={icon}
            style={{
              width: dimensions.ICON_SIZE,
              height: dimensions.ICON_SIZE,
              marginRight: dimensions.ICON_SIZE,
            }}
          />
        ) : null}
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {customText ? customText : 'Pilih...'}
        </Text>
      </View>
      <Image
        source={icons.icon_dropdown}
        style={{ width: sizes.padding, height: sizes.padding }}
      />
    </TouchableOpacity>
  );
};

DropdownForm.propTypes = {
  customText: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.any,
};

DropdownForm.defaultProp = {
  customText: null,
  onPress: null,
  icon: null,
};

export default DropdownForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: dimensions.SCREEN_WIDTH * 0.04,
    paddingHorizontal: dimensions.SCREEN_WIDTH * 0.04,
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: dimensions.SCREEN_HEIGHT * 0.02,
  },
});
