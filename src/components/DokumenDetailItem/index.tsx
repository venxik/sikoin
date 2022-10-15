import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { isEmpty } from 'lodash';

import { colors, sizes } from '../../constants';
import { DokumenDetailItemProps } from './model';

const DokumenDetailItem = (props: DokumenDetailItemProps) => {
  const { leftText, rightText, rightCustom, rightTextStyle } = props;

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
          }}
        >
          {rightCustom}
        </View>
      )}
    </View>
  );
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
