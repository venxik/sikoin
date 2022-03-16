import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, sizes } from '../constants';
import PropTypes from 'prop-types';

const SubmenuItemListCustom = props => {
  const { icon, title, style, customRightComponent } = props || {};
  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      {customRightComponent}
    </View>
  );
};

SubmenuItemListCustom.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  customRightComponent: PropTypes.element,
};

SubmenuItemListCustom.defaultProps = {
  title: null,
  icon: null,
  customRightComponent: null,
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
