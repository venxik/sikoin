import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { colors, icons, sizes } from '../constants';
import { formatter } from '../utils';

const TransaksiItemList = props => {
  const { item, onPress } = props || {};
  const { nominal, title, detail, time } = item || {};

  return (
    <View style={styles.container} onPress={onPress}>
      <Image source={icons.arrow_up_red} style={styles.iconArrow} />
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={styles.textNominal}>Rp</Text>
          <View style={styles.dot} />
          <Text style={styles.textNominal}>
            {formatter.formatStringToCurrencyNumber(nominal)}
          </Text>
        </View>
        <Text style={styles.textDetail}>{detail}</Text>
        <Text style={styles.textTime}>{time}</Text>
      </View>
    </View>
  );
};

TransaksiItemList.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.any,
  style: PropTypes.object,
};

TransaksiItemList.defaultProps = {
  onPress: null,
  item: null,
  style: null,
};

export default TransaksiItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeDarkGrey,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding / 2,
  },
  mainContainer: {
    marginLeft: 6,
  },
  iconArrow: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginTop: 10,
  },
  textTitle: {
    color: colors.bodyText,
    fontWeight: '600',
    width: '70%',
  },
  textNominal: {
    color: colors.red,
    fontSize: 16,
    fontWeight: '600',
  },
  textDetail: {
    width: '70%',
    fontSize: 12,
    color: colors.bodyText,
    marginBottom: 10,
  },
  textTime: {
    fontSize: 12,
    color: colors.bodyTextLightGrey,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.strokeDarkGrey,
    marginHorizontal: 4,
  },
});
