import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Show } from 'react-native-iconly';

import { colors, sizes } from '../../constants';
import { formatter } from '../../utils';
import { PinjamanSimulasiSectionProps } from './model';

const PinjamanSimulasiSection = (props: PinjamanSimulasiSectionProps) => {
  const { onPress, item, simulasi = false } = props;
  const { totalAngsuran, totalAngsuranBunga, totalAngsuranPokok } = item;
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.textItemTitle}>
          {simulasi ? 'Simulasi Pinjaman' : 'Rincian Angsuran'}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Show color={colors.primary} style={{ marginLeft: sizes.padding }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textItemContent, { flex: 0.7 }]}>{'Total Angsuran Pokok : '}</Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(totalAngsuranPokok)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textItemContent, { flex: 0.7 }]}>{'Total Angsuran Bunga : '}</Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(totalAngsuranBunga)}
        </Text>
      </View>
      <View style={styles.line} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textItemContent, { flex: 0.7 }]}>{'Total : '}</Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(totalAngsuran)}
        </Text>
      </View>
    </View>
  );
};

export default PinjamanSimulasiSection;

const styles = StyleSheet.create({
  textItemTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyText,
    fontWeight: '600',
  },
  textItemContent: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
  },
  line: {
    width: '70%',
    height: 2,
    backgroundColor: colors.primary,
    marginTop: sizes.padding,
    marginBottom: 4,
  },
});
