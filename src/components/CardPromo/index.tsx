import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
} from '../../constants';
import FastImage from 'react-native-fast-image';
import { CardPromoProps } from './model';
import Button from '../Button';

const CardPromo = (props: CardPromoProps) => {
  const { item, onPressSelengkapnya, onPressWeb, style } = props || null;
  const { banner, excerpt, judul } = item || {};
  return (
    <View style={[styles.container, style]}>
      <FastImage source={{ uri: banner }} style={styles.imageStyle} />
      <View style={styles.bottomContainer}>
        <Text style={styles.textTitle}>{judul}</Text>
        <Text style={styles.textContent}>{excerpt}</Text>
        <Button
          secondary
          icon={icons.arrow_up_circle_primary}
          iconLocation="left"
          onPress={onPressSelengkapnya as () => void}
          buttonContainerStyle={{
            width: '100%',
          }}
          text={'Selengkapnya'}
        />
        <Button
          onPress={onPressWeb as () => void}
          buttonContainerStyle={{
            width: '100%',
            marginTop: sizes.padding,
          }}
          text={'Buka Halaman Web'}
        />
      </View>
    </View>
  );
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
    height: SCREEN_HEIGHT * 0.5,
    borderTopLeftRadius: sizes.padding,
    borderTopRightRadius: sizes.padding,
  },
  bottomContainer: {
    padding: sizes.padding,
  },
  textTitle: {
    fontSize: sizes.padding,
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
  },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyText,
    fontFamily: 'Inter-Regular',
  },
});
