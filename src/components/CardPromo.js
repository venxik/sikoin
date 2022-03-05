import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import PropTypes from 'prop-types';

const CardPromo = props => {
  const { item, onPress, style } = props || null;
  const { title, content, image } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Image source={image} style={styles.imageStyle} />
      <View style={{ padding: sizes.padding, marginTop: '95%' }}>
        <Text style={{ fontSize: sizes.padding, color: colors.bodyText }}>
          {title}
        </Text>
        <Text style={{ marginVertical: sizes.padding, fontSize: 15 }}>
          {content}
        </Text>
      </View>
    </View>
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
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
  },
});
