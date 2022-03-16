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

CardKabar.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

CardKabar.defaultProps = {
  item: null,
  onPress: null,
  style: null,
};

export default CardKabar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    paddingHorizontal: sizes.padding,
    width: SCREEN_WIDTH * 0.8,
    marginRight: sizes.padding,
    justifyContent: 'center',
  },
  rowStyle: { flexDirection: 'row' },
  innerRowStyle: { marginLeft: 10, justifyContent: 'center' },
  textTitle: {
    fontSize: 20,
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
  },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  textName: { color: colors.bodyText, fontFamily: 'Poppins-Medium' },
  textDate: {
    fontSize: 12,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
});
