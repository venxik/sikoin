import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants';
import { HeaderPinjamanProps } from './model';

const HeaderPinjaman = (props: HeaderPinjamanProps) => {
  const { style, index } = props || {};

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.dot} />
        <View
          style={[
            styles.line,
            { backgroundColor: index > 1 ? colors.primary : colors.white },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: index > 1 ? colors.primary : colors.white },
          ]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: index > 2 ? colors.primary : colors.white },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: index > 2 ? colors.primary : colors.white },
          ]}
        />
        <View
          style={[
            styles.line,
            { backgroundColor: index > 3 ? colors.primary : colors.white },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: index > 3 ? colors.primary : colors.white },
          ]}
        />
      </View>
    </View>
  );
};

export default HeaderPinjaman;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingHorizontal: '8%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: colors.primary,
  },
});
