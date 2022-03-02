import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, images, strings } from '../constants';
import { dimensions } from '../utils';
import ButtonText from './ButtonText';

const CardKabar = props => {
  const { item, onPress, style } = props || null;
  const { title, profile_pic, content, timestamp, name } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Text style={{ fontSize: 20, color: colors.bodyText }}>{title}</Text>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Image source={profile_pic} style={{ width: 60, height: 60 }} />
        <View style={{ justifyContent: 'space-evenly', marginLeft: 10 }}>
          <Text style={{ color: colors.bodyText }}>{name}</Text>
          <Text style={{ fontSize: 12 }}>{timestamp}</Text>
        </View>
      </View>
      <Text style={{ marginVertical: 20, fontSize: 15 }}>{content}</Text>

      <ButtonText
        icon={icons.arrow_up_circle_primary}
        iconLocation="left"
        onPress={onPress}
        buttonContainerStyle={{
          backgroundColor: colors.tonalLightPrimary,
          width: '70%',
        }}
        textStyle={{ color: colors.primary }}
        text={strings.selengkapnya}
      />
    </View>
  );
};
export default CardKabar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    width: dimensions.SCREEN_WIDTH * 0.8,
    marginRight: 20,
    justifyContent: 'center',
  },
});
