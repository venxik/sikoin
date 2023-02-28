import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, MarketCategoryItem } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes } from '../../constants';
import { CategoryData, fetchCategoryData } from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCategoryScreen'>;

const MarketCategoryScreen = ({}: Props) => {
  const { categoryData } = useAppSelector((s) => s.MarketReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);

  const renderItem = ({ item }: { item: CategoryData }) => {
    return <MarketCategoryItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={'Kategori'} textStyle={{ width: '100%' }} />
      <FlatList data={categoryData} renderItem={renderItem} />
    </View>
  );
};

export default MarketCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginTop: sizes.padding,
    marginHorizontal: sizes.padding,
  },
});
