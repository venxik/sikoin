import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataDiriMainScreen = props => {
  return (
    <View style={styles.container}>
      <Text>DataDiriMainScreen</Text>
    </View>
  );
};
export default DataDiriMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
