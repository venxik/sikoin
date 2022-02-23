import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const DropdownForm = props => {
  const { onPress, customText, icon } = props || {};
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // onPress={}
      style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {icon ? (
          <Image source={icon} style={{ width: 20, height: 20 }} />
        ) : null}
        <Text
          style={{
            marginLeft: dimensions.SCREEN_WIDTH * 0.06,
            color: colors.primary,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {customText ? customText : 'Pilih...'}
        </Text>
      </View>
      <Image source={icons.arrow_right} style={{ width: 20, height: 20 }} />
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
    paddingVertical: dimensions.SCREEN_HEIGHT * 0.02,
    paddingHorizontal: dimensions.SCREEN_WIDTH * 0.04,
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: dimensions.SCREEN_HEIGHT * 0.02,
    // backgroundColor: 'red',
  },
});
