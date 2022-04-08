import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button, HeaderBack } from '../../components';
import { MarketStackParamList } from '../../config/navigation/model';
import { strings } from '../../constants';

type Props = NativeStackScreenProps<
  MarketStackParamList,
  'MarketSelectPaymentScreen'
>;

const MarketSelectPaymentScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.pilih_pembayaran} />
      <Text>MarketSelectPaymentScreen</Text>
    </SafeAreaView>
  );
};
export default MarketSelectPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
