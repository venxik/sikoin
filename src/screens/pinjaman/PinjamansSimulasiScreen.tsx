import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, PinjamanRincianSimulasiItem } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanSimulasiScreen'>;

const PinjamanSimulasiScreen: React.FC<Props> = ({ navigation }) => {
  const { simulasi } = useAppSelector((s) => s.PinjamanReducer.pinjamanSummaryData);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.kembali} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: sizes.padding,
        }}
        style={{
          paddingHorizontal: sizes.padding,
        }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Simulasi Pinjaman</Text>
          {simulasi &&
            simulasi.map((item, i) => <PinjamanRincianSimulasiItem item={item} key={i} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PinjamanSimulasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
  },
  textTitle: {
    fontFamily: 'Inter-Bold',
    color: colors.bodyTextGrey,
    fontWeight: '600',
    fontSize: 16,
  },
});
