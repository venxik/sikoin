import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { HeaderBack, PinjamanRincianItem } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'PinjamanRincianScreen'
>;

const PinjamanRincianScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.kembali} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: sizes.padding,
        }}>
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Rincian Angsuran</Text>
          <PinjamanRincianItem />
          <PinjamanRincianItem />
          <PinjamanRincianItem />
          <PinjamanRincianItem />
          <PinjamanRincianItem />
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
