import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, sizes } from '../../constants';

const PinjamanRincianItem = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.textItemTitle}>Simulasi Pinjaman</Text>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Total Angsuran Pokok : '}
        </Text>
        <Text style={styles.textItemContent}>Rp. 60.000</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Total Angsuran Pokok : '}
        </Text>
        <Text style={styles.textItemContent}>Rp. 60.000</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.textItemContent, { flex: 0.75 }]}>
          {'Total Angsuran Pokok : '}
        </Text>
        <Text style={styles.textItemContent}>Rp. 60.000</Text>
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
          {'TOTAL : '}
        </Text>
        <Text style={[styles.textItemContent, { fontSize: 15 }]}>
          Rp. 60.000
        </Text>
      </View>
    </View>
  );
};

export default PinjamanRincianItem;

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
