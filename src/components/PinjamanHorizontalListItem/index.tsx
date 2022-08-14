import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';

const PinjamanHorizontalListItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pinjaman Umum</Text>
    </View>
  );
};

export default PinjamanHorizontalListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_HEIGHT * 0.3,
    marginRight: 30,
  },
  text: {
    fontSize: 36,
    marginLeft: '16%',
    marginTop: '10%',
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
});
