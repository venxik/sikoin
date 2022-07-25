import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View } from 'react-native';
import { Button, HeaderBack } from '../../components';
import CartItem from '../../components/CartItem';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { icons, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'CartScreen'>;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItemDataList } = useAppSelector(s => s.MarketReducer);

  const navigateToCheckout = () => {
    navigation.navigate('CheckoutScreen');
  };

  const navigateToVoucher = () => {
    navigation.navigate('VoucherMainScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.keranjang} />
      <FlatList
        data={cartItemDataList}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Keranjang Kosong</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CartItem data={item} onPressVoucher={navigateToVoucher} />
        )}
      />
      <Button
        onPress={navigateToCheckout}
        buttonContainerStyle={styles.btnCheckout}
        text={`${strings.checkout} (${cartItemDataList?.length})`}
        icon={icons.icon_checkout}
        iconLocation={'left'}
      />
    </SafeAreaView>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnCheckout: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: sizes.padding,
  },
});
