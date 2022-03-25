import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants';

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <Text>Loading Indicator</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bodyTextLightGrey,
  },
});

export default LoadingIndicator;
