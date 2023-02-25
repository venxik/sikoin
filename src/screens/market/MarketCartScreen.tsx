import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, HeaderBack } from '../../components';
import CartItem from '../../components/CartItem';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCartScreen'>;

const MarketCartScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItemDataList } = useAppSelector((s) => s.MarketReducer);

  const navigateToCheckout = () => {
    navigation.navigate('MarketCheckoutScreen');
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
          paddingBottom: SCREEN_HEIGHT * 0.08,
        }}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Keranjang Kosong</Text>
          </View>
        }
        renderItem={({ item }) => <CartItem data={item} onPressVoucher={navigateToVoucher} />}
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
export default MarketCartScreen;

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