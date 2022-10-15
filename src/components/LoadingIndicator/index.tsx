import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

import { colors, sizes } from '../../constants';

const LoadingIndicator = () => (
  <Modal style={styles.loadingContainer} animationType="fade" transparent>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '20%',
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primaryWhite,
          borderRadius: sizes.padding,
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default LoadingIndicator;
