import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, SCREEN_WIDTH } from '../../constants';
import { HeaderPinjamanProps } from './model';

const HeaderPinjaman = (props: HeaderPinjamanProps) => {
  const { style, index } = props || {};

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.dot} />
        <View
          style={[styles.line, { backgroundColor: index > 1 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.dot, { backgroundColor: index > 1 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.line, { backgroundColor: index > 2 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.dot, { backgroundColor: index > 2 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.line, { backgroundColor: index > 3 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.dot, { backgroundColor: index > 3 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.line, { backgroundColor: index > 4 ? colors.primary : colors.white }]}
        />
        <View
          style={[styles.dot, { backgroundColor: index > 4 ? colors.primary : colors.white }]}
        />
      </View>
    </View>
  );
};

export default HeaderPinjaman;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginBottom: '10%',
    paddingHorizontal: '8%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.05,
    backgroundColor: colors.primary,
  },
  line: {
    width: SCREEN_WIDTH * 0.12,
    height: 4,
    backgroundColor: colors.primary,
  },
});
