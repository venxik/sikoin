import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const MarketMainScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MarketMainScreen</Text>
    </SafeAreaView>
  );
};
export default MarketMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
