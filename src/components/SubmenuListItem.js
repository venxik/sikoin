import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const SubmenuListItem = props => {
  const { icon, title, navigateTo } = props || {};
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // onPress={navigation.navigate(navigateTo)}
      style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image source={icon} style={{ width: 20, height: 20 }} />
        <Text
          style={{
            marginLeft: dimensions.SCREEN_WIDTH * 0.06,
            color: colors.black,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
      <Image source={icon} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};

SubmenuListItem.propTypes = {
  navigateTo: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.any,
};

SubmenuListItem.defaultProp = {
  navigateTo: null,
  title: null,
  icon: null,
};

export default SubmenuListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeDarkGrey,
    paddingVertical: dimensions.SCREEN_HEIGHT * 0.02,
    paddingHorizontal: dimensions.SCREEN_WIDTH * 0.04,
    // backgroundColor: 'red',
  },
});
