import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, sizes } from '../../constants';
import { SubmenuItemListCustomProps } from './model';

const SubmenuItemListCustom = (props: SubmenuItemListCustomProps) => {
  const { icon, title, style, customRightComponent } = props || {};
  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      {customRightComponent}
    </View>
  );
};

export default SubmenuItemListCustom;

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
  titleStyle: {
    marginLeft: sizes.padding,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  iconStyle: { width: sizes.padding, height: sizes.padding },
});
