import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, icons, sizes } from '../../constants';
import { CheckoutPaymentItemProps } from './model';

const CheckoutPaymentItem = (props: CheckoutPaymentItemProps) => {
  const { onPress, isSelected, data } = props;
  const { nama, id, info } = data;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.textTitle}>{nama}</Text>
        <Text style={styles.textSubtitle}>{id === 0 ? info : 'Koperasi'}</Text>
      </View>
      {isSelected && <Image source={icons.icon_checkmark} style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default CheckoutPaymentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: sizes.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: sizes.padding * 2,
    alignItems: 'center',
    // borderRadius: sizes.padding,
  },
  textTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: colors.bodyText,
  },
  textSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.bodyText,
  },
  icon: {
    width: sizes.padding,
    height: sizes.padding,
  },
});
