import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, sizes } from '../../constants';
import { FilterHorizontalProps } from './model';

const FilterHorizontal = (props: FilterHorizontalProps) => {
  const { onPress, isSelected, item, style } = props || {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? colors.tonalPrimary : colors.white,
          borderWidth: isSelected ? 0 : 1,
        },
        style,
      ]}
    >
      <Text style={styles.textStyle}>{item}</Text>
    </TouchableOpacity>
  );
};

export default FilterHorizontal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes.padding,
    paddingVertical: sizes.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.padding / 2,
    borderColor: colors.tonalPrimary,
  },
  textStyle: {
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});
