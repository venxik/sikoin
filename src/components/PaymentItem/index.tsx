import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, sizes } from '../../constants';
import { PaymentItemProps } from './model';

const PaymentItem = (props: PaymentItemProps) => {
  const { data, isSelected, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? colors.primary : colors.strokeGrey,
          backgroundColor: isSelected
            ? colors.tonalLightPrimary
            : 'transparent',
          elevation: isSelected ? 4 : 0,
        },
      ]}>
      <View style={styles.row}>
        <Image
          source={data.icon}
          style={styles.iconStyle}
          resizeMode="contain"
        />
        <Text style={styles.textStyle}>{data.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default PaymentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.padding,
    borderRadius: sizes.padding * 1.5,
    marginBottom: sizes.padding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyText,
    flex: 0.6,
  },
  iconStyle: { width: 100, height: 20, flex: 0.3 },
});
