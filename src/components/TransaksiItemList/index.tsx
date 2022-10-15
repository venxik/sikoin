import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { isEmpty } from 'lodash';
import moment from 'moment';

import { colors, icons, sizes } from '../../constants';
import { formatter } from '../../utils';
import { TransaksiItemListProps } from './model';

const TransaksiItemList = (props: TransaksiItemListProps) => {
  const { item, onPress } = props || {};
  const { nominal, title, detail, time } = item || {};

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={icons.arrow_up_red} style={styles.iconArrow} />
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <Text style={styles.textNominal}>Rp</Text>
          <View style={styles.dot} />
          <Text style={styles.textNominal}>{formatter.formatNumberToCurreny(nominal)}</Text>
        </View>
        <Text style={styles.textDetail}>{detail}</Text>
        <Text style={styles.textTime}>
          {!isEmpty(time) ? moment(time).format('DD/MM/YYYY') : '-'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransaksiItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeDarkGrey,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding / 2,
  },
  mainContainer: {
    marginLeft: 6,
  },
  iconArrow: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginTop: 10,
  },
  textTitle: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
    width: '70%',
  },
  textNominal: {
    color: colors.red,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  textDetail: {
    width: '70%',
    fontSize: 12,
    color: colors.bodyText,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  textTime: {
    fontSize: 12,
    color: colors.bodyTextLightGrey,
    fontFamily: 'Inter-Regular',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.strokeDarkGrey,
    marginHorizontal: 4,
  },
});
