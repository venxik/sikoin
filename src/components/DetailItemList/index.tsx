import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../constants';
import { DetailItemListProps } from './model';

const DetailItemList = (props: DetailItemListProps) => {
  const { title, content, showBorder = false } = props || {};
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: showBorder ? colors.strokeGrey : '',
          borderBottomWidth: showBorder ? 0.5 : 0,
        },
      ]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content ? content : '-'}</Text>
    </View>
  );
};

export default DetailItemList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: sizes.padding,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.bodyText,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  separator: {
    width: '100%',
  },
});
