import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDown, ArrowUp } from 'react-native-iconly';
import { colors, sizes } from '../../constants';
import { formatter } from '../../utils';
import { SaldoSimpananDetailItemProps } from './model';

const SaldoSimpananDetailItem = (props: SaldoSimpananDetailItemProps) => {
  const { nominal, catatan, jenis, kode, tanggal } = props?.item || {};

  const textColor = () => {
    if (jenis) {
      if (jenis === 'SIMPANAN') return colors.green;
      return colors.red;
    }
    return colors.bodyText;
  };

  return (
    <View style={styles.container}>
      {jenis && jenis === 'SIMPANAN' ? (
        <ArrowUp color={colors.green} />
      ) : (
        <ArrowDown color={colors.red} />
      )}
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>{jenis}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.textNominal, { color: textColor() }]}>Rp</Text>
          <View style={styles.dot} />
          <Text style={[styles.textNominal, { color: textColor() }]}>
            {formatter.formatNumberToCurreny(nominal)}
          </Text>
        </View>
        <Text style={styles.textDetail}>{catatan || '-'}</Text>
        <Text style={styles.textDetail}>{kode}</Text>
        <Text style={styles.textTime}>{tanggal}</Text>
      </View>
    </View>
  );
};

export default SaldoSimpananDetailItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.strokeDarkGrey,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding / 2,
  },
  mainContainer: {
    marginLeft: 6,
  },
  textTitle: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
  },
  textNominal: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  textDetail: {
    fontSize: 12,
    marginBottom: 6,
    fontFamily: 'Inter-Regular',
    color: colors.bodyText,
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
