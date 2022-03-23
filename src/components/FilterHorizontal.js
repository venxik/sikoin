import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, sizes } from '../constants';
import PropTypes from 'prop-types';

const FilterHorizontal = props => {
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
      ]}>
      <Text style={styles.textStyle}>{item}</Text>
    </TouchableOpacity>
  );
};

FilterHorizontal.propTypes = {
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  item: PropTypes.any,
  style: PropTypes.object,
};

FilterHorizontal.defaultProps = {
  onPress: null,
  isSelected: false,
  item: null,
  style: null,
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
    marginRight: sizes.padding,
  },
  textStyle: {
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});
