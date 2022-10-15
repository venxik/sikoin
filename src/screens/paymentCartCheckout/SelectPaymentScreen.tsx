import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, HeaderBack, PaymentItem } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { icons, images, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'SelectPaymentScreen'>;

const data = [
  {
    icon: images.img_bca,
    value: 'BCA',
    text: 'Bank BCA',
  },
  {
    icon: images.img_bni,
    value: 'BNI',
    text: 'Bank BNI',
  },
  {
    icon: images.img_bca,
    value: 'CIMB',
    text: 'Bank CIMB',
  },
  {
    icon: images.img_mandiri,
    value: 'MANDIRI',
    text: 'Bank Mandiri',
  },
  {
    icon: images.img_saldo_icon,
    value: 'SUKARELA',
    text: 'Saldo Sukarela',
  },
];

const SelectPaymentScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const navigateToSuccessScreen = () => {
    navigation.navigate('PaymentScreen', {
      nominal: 1000000,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.pilih_pembayaran} />
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingHorizontal: sizes.padding }}
        renderItem={({ item }) => (
          <PaymentItem
            data={item}
            isSelected={selectedValue === item.value}
            onPress={() => setSelectedValue(item.value)}
          />
        )}
      />
      <Button
        onPress={navigateToSuccessScreen}
        buttonContainerStyle={styles.btnStyle}
        text={strings.konfirmasi}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
      />
    </SafeAreaView>
  );
};
export default SelectPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: sizes.padding,
  },
});
