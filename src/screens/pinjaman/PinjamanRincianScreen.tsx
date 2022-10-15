import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, PinjamanRincianSimulasiItem } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { fetchPinjamanDisetujuiDetailData } from '../../redux/reducers/PinjamanReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanRincianScreen'>;

const PinjamanRincianScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;

  const dispatch = useAppDispatch();
  const { rincianAngsuran } = useAppSelector((s) => s.PinjamanReducer.pinjamanDisetujuiDetail);

  useEffect(() => {
    dispatch(fetchPinjamanDisetujuiDetailData(id));
  }, []);

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
          <Text style={styles.textTitle}>Rincian Angsuran</Text>
          {rincianAngsuran &&
            rincianAngsuran.map((item, i) => <PinjamanRincianSimulasiItem key={i} item={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PinjamanRincianScreen;

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
