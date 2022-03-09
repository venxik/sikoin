import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../constants';
import ButtonText from './ButtonText';
import PropTypes from 'prop-types';

const CardKabar = props => {
  const { item, onPress, style } = props || null;
  const { title, profile_pic, content, timestamp, name } = item || {};
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.rowStyle}>
        <Image source={profile_pic} style={{ width: 60, height: 60 }} />
        <View style={styles.innerRowStyle}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textDate}>{timestamp}</Text>
        </View>
      </View>
      <Text style={styles.textContent}>{content}</Text>

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

CardKabar.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

CardKabar.defaultProp = {
  item: null,
  onPress: null,
  style: null,
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
  textTitle: { fontSize: sizes.padding, color: colors.bodyText },
  rowStyle: { flexDirection: 'row', marginTop: 30 },
  innerRowStyle: { justifyContent: 'space-evenly', marginLeft: 10 },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyTextGrey,
  },
  textName: { color: colors.bodyText },
  textDate: { fontSize: 12, color: colors.bodyTextGrey },
});
