import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, sizes } from '../../constants';
import { formatter } from '../../utils';
import { PinjamanSimulasiItemProps } from './model';

const PinjamanSimulasiItem = (props: PinjamanSimulasiItemProps) => {
  const {
    angsuran_bunga,
    angsuran_pokok,
    bulan,
    jumlah_angsuran,
    saldo,
    saldo_setelah_bayar,
  } = props.item;
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.textItemTitle}>Angsuran {bulan}</Text>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Saldo : '}
        </Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(saldo)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Angsuran Pokok : '}
        </Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(angsuran_pokok)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Angsuran Bunga : '}
        </Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(angsuran_bunga)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Saldo Setelah Bayar : '}
        </Text>
        <Text style={styles.textItemContent}>
          Rp. {formatter.formatNumberToCurreny(saldo_setelah_bayar)}
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: 1,
          backgroundColor: colors.primary,
          marginTop: sizes.padding,
          marginBottom: 4,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textItemContent, { flex: 0.7, fontSize: 15 }]}>
          {'Jumlah Angsuran : '}
        </Text>
        <Text style={[styles.textItemContent, { fontSize: 15 }]}>
          Rp. {formatter.formatNumberToCurreny(jumlah_angsuran)}
        </Text>
      </View>
    </View>
  );
};

export default PinjamanSimulasiItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '8%',
  },
  iconStyle: { width: sizes.padding, height: sizes.padding },
  row: { flexDirection: 'row', marginBottom: 4 },
  textItemTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyText,
    fontWeight: '600',
    marginBottom: 4,
  },
  textItemContent: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
  },
});
