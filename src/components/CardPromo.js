import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';

const CardPromo = props => {
  const { item, onPress, style } = props || null;
  const { title, content, image } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Image
        source={image}
        style={{
          ...StyleSheet.absoluteFill,
          width: '100%',
          height: '60%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View style={{ padding: 20, marginTop: '95%' }}>
        <Text style={{ fontSize: 20, color: colors.bodyText }}>{title}</Text>
        <Text style={{ marginVertical: 20, fontSize: 15 }}>{content}</Text>
      </View>
    </View>
  );
};
export default CardPromo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: dimensions.SCREEN_WIDTH * 0.8,
    marginRight: 20,
  },
});
