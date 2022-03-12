import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, sizes } from '../constants';
import PropTypes from 'prop-types';

const SubmenuItemList = props => {
  const { icon, title, onPress, style } = props || {};
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <Image source={icons.arrow_right_primary_2} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

SubmenuItemList.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.any,
};

SubmenuItemList.defaultProps = {
  onPress: null,
  title: null,
  icon: null,
};

export default SubmenuItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.strokeDarkGrey,
    paddingVertical: '8%',
  },
  iconStyle: { width: sizes.padding, height: sizes.padding },
  titleStyle: {
    marginLeft: sizes.padding,
    color: colors.bodyText,
    fontSize: 15,
    fontWeight: '500',
  },
});
