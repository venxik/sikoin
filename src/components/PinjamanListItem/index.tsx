import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { colors, icons, sizes } from '../../constants';
import { formatter } from '../../utils';
import { PinjamanListItemProps } from './model';

const PinjamanListItem = (props: PinjamanListItemProps) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={icons.icon_tick_square}
          style={styles.iconStyle}
          resizeMode="cover"
        />
        <Text style={styles.textTitle}>{item.namaJenisPinjaman}</Text>
      </View>
      <View
        style={{
          marginLeft: 8 + sizes.padding,
        }}>
        <Text style={styles.textContent}>{item.tanggal}</Text>
        <Text style={styles.textNominal}>
          Rp. {formatter.formatNumberToCurreny(item.nominal)}
        </Text>
      </View>
    </View>
  );
};

export default PinjamanListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '8%',
  },
  iconStyle: { width: sizes.padding, height: sizes.padding },
  textTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    color: colors.bodyText,
  },
  textContent: {
    marginTop: 12,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.primary,
  },
  textNominal: {
    fontFamily: 'Inter-Bold',
    color: colors.primary,
  },
});
