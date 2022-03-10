import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SCREEN_HEIGHT, sizes } from '../constants';
import PropTypes from 'prop-types';

const CardDiskon = props => {
  const { item, style, onPress } = props || null;
  const { image } = item || {};
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={image} style={styles.imageStyle} resizeMode="cover" />
    </TouchableOpacity>
  );
};

CardDiskon.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

CardDiskon.defaultProp = {
  item: null,
  onPress: null,
  style: null,
};

export default CardDiskon;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizes.padding,
    elevation: 10,
  },
  imageStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: sizes.padding,
  },
});
