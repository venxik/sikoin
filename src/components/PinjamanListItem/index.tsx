import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TickSquare } from 'react-native-iconly';

import { colors, sizes } from '../../constants';
import { formatter } from '../../utils';
import { PinjamanListItemProps } from './model';

const PinjamanListItem = (props: PinjamanListItemProps) => {
  const { item, onPress, disabled = false } = props;

  const tickColor = () => {
    const { status } = item;
    if (status === 'DISETUJUI') return colors.green;
    if (status === 'DITOLAK') return colors.red;
    return colors.primary;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TickSquare color={tickColor()} size={sizes.padding} />
        <Text style={styles.textTitle}>{item.namaJenisPinjaman}</Text>
      </View>
      <View
        style={{
          marginLeft: 8 + sizes.padding,
        }}
      >
        <Text style={styles.textContent}>{item.tanggal}</Text>
        <Text style={styles.textNominal}>Rp. {formatter.formatNumberToCurreny(item.nominal)}</Text>
      </View>
    </TouchableOpacity>
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
