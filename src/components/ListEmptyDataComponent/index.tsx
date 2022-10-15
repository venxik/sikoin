import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, icons, SCREEN_WIDTH, sizes } from '../../constants';
import { ListEmptyDataComponentProps } from './model';

const ListEmptyDataComponent = (props: ListEmptyDataComponentProps) => {
  const { text, onPress } = props || {};
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={icons.icon_add_data}
        style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3 }}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ListEmptyDataComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: sizes.padding,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    width: '70%',
    textAlign: 'center',
  },
});
