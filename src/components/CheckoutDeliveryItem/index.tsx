import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, icons, sizes } from '../../constants';
import { formatter } from '../../utils';
import { CheckoutDeliveryItemProps } from './model';

const CheckoutDeliveryItem = (props: CheckoutDeliveryItemProps) => {
  const { onPress, isSelected, data } = props;
  const { cost, service } = data;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(data)}>
      <View>
        <Text style={styles.textTitle}>{service}</Text>
        <Text style={styles.textSubtitle}>{`Rp ${formatter.formatNumberToCurreny(cost)}`}</Text>
      </View>
      {isSelected && <Image source={icons.icon_checkmark} style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default CheckoutDeliveryItem;

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
