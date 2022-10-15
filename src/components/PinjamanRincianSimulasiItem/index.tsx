import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { isEmpty } from 'lodash';

import { colors, sizes } from '../../constants';
import { formatter } from '../../utils';
import { PinjamanRincianItemProps } from './model';

const PinjamanRincianSimulasiItem = (props: PinjamanRincianItemProps) => {
  const {
    angsuranBunga,
    angsuranPokok,
    bulan,
    jumlahAngsuran,
    saldo,
    tanggalJatuhTempo,
    statusBayar,
  } = props.item;
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.textItemTitle}>
        {`Angsuran ${bulan} `}
        {!isEmpty(tanggalJatuhTempo) && `(${tanggalJatuhTempo})`}
      </Text>
      <View style={styles.row}>
        <Text style={styles.textItemContentLeft}>{'Saldo : '}</Text>
        <Text style={styles.textItemContentRight}>
          Rp. {formatter.formatNumberToCurreny(saldo)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textItemContentLeft}>{'Angsuran Pokok : '}</Text>
        <Text style={styles.textItemContentRight}>
          Rp. {formatter.formatNumberToCurreny(angsuranPokok)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textItemContentLeft}>{'Angsuran Bunga : '}</Text>
        <Text style={styles.textItemContentRight}>
          Rp. {formatter.formatNumberToCurreny(angsuranBunga)}
        </Text>
      </View>
      {!isEmpty(statusBayar) && (
        <View style={styles.row}>
          <Text style={styles.textItemContentLeft}>{'Status Bayar : '}</Text>
          <Text style={styles.textItemContentRight}>{statusBayar}</Text>
        </View>
      )}
      <View
        style={{
          width: '85%',
          height: 1,
          backgroundColor: colors.primary,
          marginTop: sizes.padding,
          marginBottom: 4,
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textItemContentLeft, { fontSize: 15 }]}>{'Jumlah Angsuran : '}</Text>
        <Text style={[styles.textItemContentRight, { fontSize: 15, textAlign: 'right' }]}>
          Rp. {formatter.formatNumberToCurreny(jumlahAngsuran)}
        </Text>
      </View>
    </View>
  );
};

export default PinjamanRincianSimulasiItem;

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
  textItemContentLeft: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
    flex: 0.5,
  },
  textItemContentRight: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
    flex: 0.3,
    textAlign: 'right',
  },
});
