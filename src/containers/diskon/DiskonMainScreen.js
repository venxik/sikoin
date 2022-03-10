import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { CardDiskon, HeaderBack, MenuHeaderIcon } from '../../components';
import { sizes, strings } from '../../constants';

const DiskonMainScreen = () => {
  const { diskonDataList } = useSelector(s => s.DiskonReducer) || {};

  const renderDiskonCard = () => {
    return (
      <View style={{ marginTop: sizes.padding * 1.5 }}>
        {diskonDataList.map((item, i) => (
          <CardDiskon item={item} key={i} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <ScrollView
        style={{
          paddingHorizontal: sizes.padding,
        }}>
        <MenuHeaderIcon menu={strings.diskon} />
        {renderDiskonCard()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default DiskonMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
