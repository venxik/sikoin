import React, { FC } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardDiskon, HeaderBack, MenuHeaderIcon } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'DiskonMainScreen'>;

const DiskonMainScreen: FC<Props> = () => {
  const { diskonDataList } = useAppSelector((s) => s.DiskonReducer) || {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <FlatList
        data={diskonDataList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
        }}
        ListHeaderComponent={<MenuHeaderIcon menu={strings.diskon} />}
        ListHeaderComponentStyle={{ marginVertical: sizes.padding }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <CardDiskon
              item={item}
              onPress={() => {
                console.warn(item);
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default DiskonMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
