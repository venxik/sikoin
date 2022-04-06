import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { CardDiskon, HeaderBack, MenuHeaderIcon } from '../../components';
import { DiskonStackParamList } from '../../config/navigation/model';
import { useAppSelector } from '../../config';
import { sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<DiskonStackParamList, 'DiskonMainScreen'>;

const DiskonMainScreen: FC<Props> = () => {
  const { diskonDataList } = useAppSelector(s => s.DiskonReducer) || {};

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
                console.log(item);
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
