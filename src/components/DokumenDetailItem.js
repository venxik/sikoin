import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, sizes } from '../constants';
import { isEmpty } from 'lodash';

const DokumenDetailItem = props => {
  const { leftText, rightText, rightCustom, rightTextStyle } = props || {};

  return (
    <View style={styles.container}>
      <Text style={styles.textLeft} numberOfLines={1}>
        {leftText}
      </Text>
      {!isEmpty(rightText) ? (
        <Text style={[styles.textRight, rightTextStyle]}>{rightText}</Text>
      ) : (
        <View
          style={{
            width: '60%',
          }}>
          {rightCustom()}
        </View>
      )}
    </View>
  );
};

DokumenDetailItem.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  rightCustom: PropTypes.func,
  rightTextStyle: PropTypes.object,
};

DokumenDetailItem.defaultProps = {
  leftText: '',
  rightText: '',
  rightCustom: null,
  rightTextStyle: null,
};

export default DokumenDetailItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.padding,
    borderBottomColor: colors.strokeGrey,
    borderBottomWidth: 1,
  },
  textLeft: {
    width: '35%',
    fontFamily: 'Poppins-Regular',
    color: colors.bodyTextGrey,
  },
  textRight: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.bodyText,
    width: '50%',
  },
});
