import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH, sizes, strings } from '../../constants';
import Button from '../Button';
import { CardKabarProps } from './model';

const CardKabar = (props: CardKabarProps) => {
  const { item, onPress, style } = props || null;
  const { banner, excerpt, judul } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textTitle}>{judul}</Text>
      <FastImage
        source={{ uri: banner || 'https://picsum.photos/id/3/400/400' }}
        style={styles.bannerStyle}
      />
      <Text style={styles.textContent}>{excerpt}</Text>
      <Button
        secondary
        icon={icons.arrow_up_circle_primary}
        iconLocation="left"
        onPress={onPress}
        buttonContainerStyle={{
          width: '70%',
        }}
        text={strings.selengkapnya}
      />
    </View>
  );
};

export default CardKabar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    padding: sizes.padding,
    width: SCREEN_WIDTH * 0.8,
    marginRight: sizes.padding,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  bannerStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: sizes.padding,
  },
});
