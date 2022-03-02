import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, images, strings } from '../constants';
import { dimensions } from '../utils';
import ButtonText from './ButtonText';

const CardLastItem = props => {
  const { onPress, style, icon } = props || null;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={images.daftar_koperasi_bg}
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: 20,
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />

      <Image
        source={icon}
        style={{ width: '30%', height: '30%', marginBottom: 20 }}
        resizeMode="contain"
      />

      <ButtonText
        onPress={onPress}
        buttonContainerStyle={{
          backgroundColor: colors.primaryLight,
          width: '50%',
        }}
        textStyle={{ color: colors.white }}
        text={strings.selengkapnya}
      />
    </View>
  );
};
export default CardLastItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.SCREEN_WIDTH * 0.8,
  },
});
