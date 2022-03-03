import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, images, strings } from '../constants';
import { dimensions } from '../utils';
import ButtonText from './ButtonText';
import PropTypes from 'prop-types';

const CardLastItem = props => {
  const { onPress, style, icon } = props || null;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={images.daftar_koperasi_bg}
        style={styles.imageStyle}
        resizeMode="cover"
      />

      <Image source={icon} style={styles.iconStyle} resizeMode="contain" />

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

CardLastItem.propTypes = {
  icon: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

CardLastItem.defaultProp = {
  icon: null,
  onPress: null,
  style: null,
};

export default CardLastItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.SCREEN_WIDTH * 0.8,
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  iconStyle: { width: '30%', height: '30%', marginBottom: 20 },
});
