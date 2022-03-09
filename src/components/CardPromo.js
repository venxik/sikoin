import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';

const CardPromo = props => {
  const { item, onPress, style } = props || null;
  const { title, content, image } = item || {};
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={image} style={styles.imageStyle} />
      <View style={styles.bottomContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textContent}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

CardPromo.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

CardPromo.defaultProp = {
  item: null,
  onPress: null,
  style: null,
};

export default CardPromo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    width: SCREEN_WIDTH * 0.8,
    marginRight: sizes.padding,
  },
  imageStyle: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
  },
  bottomContainer: {
    padding: sizes.padding,
  },
  textTitle: { fontSize: sizes.padding, color: colors.bodyText },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyText,
  },
});
