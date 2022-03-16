import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, icons, sizes } from '../constants';
import { formatter } from '../utils';
import PropTypes from 'prop-types';

const SaldoItemList = props => {
  const { text, nominal, onPress } = props || {};
  return (
    <View style={{ marginBottom: sizes.padding }}>
      <View style={styles.mainContainer}>
        <View style={styles.leftDotStyle} />
        <View style={styles.innerContainer}>
          <View style={{ marginLeft: sizes.padding }}>
            <Text style={styles.titleStyle}>{text}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nominalStyle}>Rp</Text>
              <View style={styles.nominalDotStyle} />
              <Text style={styles.nominalStyle}>
                {formatter.formatStringToCurrencyNumber(nominal)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={icons.arrow_right_square}
              style={{
                width: sizes.icon_size,
                height: sizes.icon_size,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomLineStyle} />
    </View>
  );
};

SaldoItemList.propTypes = {
  text: PropTypes.string,
  nominal: PropTypes.number,
  onPress: PropTypes.func,
};

SaldoItemList.defaultProps = {
  text: null,
  nominal: null,
  onPress: null,
};

export default SaldoItemList;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 10,
    paddingVertical: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  titleStyle: {
    fontSize: 16,
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
  },
  leftDotStyle: {
    marginTop: 8,
    marginLeft: 10,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.bodyTextLightGrey,
  },
  nominalStyle: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Medium',
  },
  nominalDotStyle: {
    marginHorizontal: 6,
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.strokeDarkGrey,
  },
  bottomLineStyle: {
    marginTop: 10,
    marginLeft: sizes.padding,
    width: '90%',
    height: 0.5,
    backgroundColor: colors.bodyTextLightGrey,
  },
});
