import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {} from 'react-native-popup-menu';

import { HeaderBack, MenuHeaderIcon, SaldoSimpananDetailItem } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'SaldoSimpananDetailScreen'>;

const SaldoSimpananDetail: React.FC<Props> = () => {
  const { mutasiSimpanan } = useAppSelector((s) => s.SaldoSimpananReducer);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <ScrollView
        style={{
          padding: sizes.padding,
        }}
      >
        <MenuHeaderIcon
          menu={strings.simpanan}
          title={mutasiSimpanan?.jenisSimpanan?.nama}
          style={{ marginBottom: sizes.padding }}
        />
        <View>
          <Text style={styles.textNominalTitle}>
            Total Dana {mutasiSimpanan?.jenisSimpanan?.nama}
          </Text>
          <View style={styles.saldoRowContainer}>
            <Image source={icons.icon_rp_dark} style={{ width: 34, height: 34 }} />
            <Text style={styles.textSaldo}>
              {formatter.formatNumberToCurreny(mutasiSimpanan?.totalDana?.danaSimpanan)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textNominalTitle}>
            Total Pending {mutasiSimpanan?.jenisSimpanan?.nama}
          </Text>
          <View style={styles.saldoRowContainer}>
            <Image source={icons.icon_rp_dark} style={{ width: 34, height: 34, opacity: 0.5 }} />
            <Text style={[styles.textSaldo, { opacity: 0.5 }]}>
              {formatter.formatNumberToCurreny(mutasiSimpanan?.totalDana?.danaPending)}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          {mutasiSimpanan?.mutasi.map((item, i) => (
            <SaldoSimpananDetailItem item={item} key={i} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SaldoSimpananDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    borderRadius: sizes.padding,
  },
  saldoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.padding,
  },
  textSaldo: {
    fontSize: 34,
    color: colors.bodyText,
    marginLeft: 16,
    fontFamily: 'Inter-Bold',
  },
  textNominalTitle: {
    color: colors.bodyText,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginBottom: sizes.padding / 2,
  },
});
