import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CheckoutAddressItem, HeaderBack } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { sizes, strings } from '../../constants';
import { CheckoutAlamatData, fetchChangeCheckoutAddress } from '../../redux/reducers/MarketReducer';
type Props = NativeStackScreenProps<HomeStackParamList, 'MarketChangeAddressScreen'>;

const MarketChangeAddressScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { checkoutData } = useAppSelector((s) => s.MarketReducer) || {};
  const { alamat, totalBerat } = checkoutData;

  const renderItem = ({ item }: { item: CheckoutAlamatData }) => {
    return (
      <CheckoutAddressItem
        item={item}
        onPress={() => {
          dispatch(fetchChangeCheckoutAddress({ alamatId: item.id, totalBerat }));
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar_alamat} />
      <FlatList
        data={alamat}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
          flexGrow: 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={() => {
        //   return (
        //     <View style={{ flex: 1 }}>
        //       <ListEmptyDataComponent
        //         text={strings.tambah_alamat}
        //         onPress={() => navigateToAddScreen(false)}
        //       />
        //     </View>
        //   );
        // }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
export default MarketChangeAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
