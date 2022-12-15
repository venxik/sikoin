import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import FastImage from 'react-native-fast-image';

import { colors, images, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import { PinjamanHorizontalListItemProps } from './model';

const PinjamanHorizontalListItem = (props: PinjamanHorizontalListItemProps) => {
  const { onPress, item } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{item.nama}</Text>
      <FastImage
        source={images.img_pinjaman_overlay_1}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '60%',
        }}
      />
    </TouchableOpacity>
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
    zIndex: 99,
  },
});
