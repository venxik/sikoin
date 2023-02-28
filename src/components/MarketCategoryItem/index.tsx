import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { colors, sizes } from '../../constants';
import { MarketCategoryItemProps } from './model';

const MarketCategoryItem = (props: MarketCategoryItemProps) => {
  const { item } = props;
  const { nama, icon } = item || {};
  const navigation = useNavigation();

  const onPressItem = () => {
    navigation.navigate('MarketCategoryProductScreen', item);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View style={styles.rowContainer}>
        <FastImage source={{ uri: icon }} style={styles.imageStyle} />
        <Text style={styles.textName}>{nama}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MarketCategoryItem;

const styles = StyleSheet.create({
  container: {
    // marginTop: sizes.padding,
    paddingVertical: sizes.padding,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes.padding * 0.3,
  },
  textName: {
    fontFamily: 'Poppins-Medium',
    color: colors.bodyText,
    fontSize: 15,
  },
});
