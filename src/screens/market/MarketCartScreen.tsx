import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, HeaderBack } from '../../components';
import CartItem from '../../components/CartItem';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import { fetchCartData } from '../../redux/reducers/MarketReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCartScreen'>;

const MarketCartScreen: React.FC<Props> = ({ navigation }) => {
  const { cartData } = useAppSelector((s) => s.MarketReducer);
  const { isLoading } = useAppSelector((s) => s.loading);
  const dispatch = useAppDispatch();

  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const navigateToCheckout = () => {
    navigation.navigate('MarketCheckoutScreen');
  };

  const renderItem = useCallback(
    ({ item }) => (
      <CartItem
        data={item}
        onPressCheckbox={(value, status) => {
          if (status) setSelectedCartId((prevValue) => prevValue.concat(value));
          else {
            const temp = selectedCartId.filter((id) => id !== value);
            setSelectedCartId(temp);
          }
        }}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.keranjang} />
      <FlatList
        data={cartData.keranjang}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SCREEN_HEIGHT * 0.08,
        }}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Keranjang Kosong</Text>
            </View>
          ) : null
        }
        renderItem={renderItem}
      />
      <Button
        onPress={navigateToCheckout}
        buttonContainerStyle={styles.btnCheckout}
        text={`${strings.checkout} (${cartData.keranjang?.length})`}
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
