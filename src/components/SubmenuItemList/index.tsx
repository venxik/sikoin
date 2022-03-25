import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, icons, sizes } from '../../constants';
import { SubmenuItemListProps } from './model';

const SubmenuItemList = (props: SubmenuItemListProps) => {
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
    fontFamily: 'Poppins-Medium',
  },
});
