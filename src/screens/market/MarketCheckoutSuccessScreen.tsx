import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'MarketCheckoutSuccessScreen'>;

const MarketCheckoutSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToMainScreen = () => {
    navigation.navigate('MarketMainScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={icons.icon_topup_success} style={styles.icon} resizeMode="contain" />
        <Text style={styles.textTitle}>{'Terima kasih atas pembelian Anda'}</Text>
        <Text style={styles.textContent}>
          {
            'Tim kami akan melakukan verifikasi dan memproses pembelian Kamu. Tim kami akan mengirimkan barang sesuai pesanan dan kurir yang sudah tertera'
          }
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: sizes.padding }}>
        <Button
          buttonContainerStyle={{
            marginHorizontal: sizes.padding,
            width: '40%',
          }}
          text={strings.kembali}
          onPress={navigateToMainScreen}
          shadow
        />
      </View>
    </SafeAreaView>
  );
};
export default MarketCheckoutSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
    alignItems: 'center',
    paddingVertical: sizes.padding,
    backgroundColor: colors.white,
    marginHorizontal: sizes.padding,
    borderRadius: sizes.padding,
  },
  icon: {
    width: 120,
    height: 120,
  },
  textTitle: {
    color: colors.bodyText,
    fontSize: 24,
    textAlign: 'center',
    width: '70%',
    marginBottom: sizes.padding,
    fontFamily: 'Poppins-Regular',
  },
  textContent: {
    color: colors.bodyText,
    fontSize: 15,
    textAlign: 'center',
    width: '90%',
    fontFamily: 'Inter-Regular',
    lineHeight: sizes.icon_size,
  },
});
