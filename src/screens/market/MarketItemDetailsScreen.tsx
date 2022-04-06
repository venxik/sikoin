import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { MarketStackParamList } from '../../config/navigation/model';

type Props = NativeStackScreenProps<
  MarketStackParamList,
  'MarketItemDetailsScreen'
>;

const MarketItemDetailsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MarketItemDetailsScreen</Text>
    </SafeAreaView>
  );
};
export default MarketItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
