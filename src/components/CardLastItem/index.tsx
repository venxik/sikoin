import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, images, SCREEN_WIDTH, sizes, strings } from '../../constants';
import Button from '../Button';
import { CardLastItemProps } from './model';

const CardLastItem = (props: CardLastItemProps) => {
  const { onPress, style, icon, customText } = props || null;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={images.daftar_koperasi_bg}
        style={styles.imageStyle}
        resizeMode="cover"
      />

      <Image source={icon} style={styles.iconStyle} resizeMode="contain" />

      <Button
        onPress={onPress}
        buttonContainerStyle={{
          backgroundColor: colors.primaryLight,
          width: '50%',
        }}
        textStyle={{ color: colors.white }}
        text={customText ?? strings.selengkapnya}
      />
    </View>
  );
};

export default CardLastItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.8,
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: sizes.padding,
    width: '100%',
    height: '100%',
  },
  iconStyle: { width: 100, height: 100, marginBottom: sizes.padding },
});
