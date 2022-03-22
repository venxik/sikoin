import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { CardDiskon, HeaderBack, MenuHeaderIcon } from '../../components';
import { sizes, strings } from '../../constants';

const DiskonMainScreen = () => {
  const { diskonDataList } = useSelector(s => s.DiskonReducer) || {};

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
          return <CardDiskon item={item} />;
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
