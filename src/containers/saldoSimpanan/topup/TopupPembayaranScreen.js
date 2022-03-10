import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ButtonText, HeaderBack } from '../../../components';
import { colors, icons, images, sizes, strings } from '../../../constants';
import { formatter } from '../../../utils';

const TopupPembayaranScreen = ({ route }) => {
  const { nominal } = route.params || {};
  const navigation = useNavigation();

  const navigateToSuccessScreen = () => {
    navigation.navigate('TopupSuccessScreen');
  };

  const renderBankList = () => (
    <View style={{ marginTop: sizes.padding }}>
      <Image source={images.img_bca} style={{ width: 100, height: 40 }} />
      <Text style={{ color: colors.black, fontSize: 18, fontWeight: 'bold' }}>
        1231312321
      </Text>
      <Text style={{ color: colors.black, fontSize: 18 }}>PT. XXXXXX</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.pilih_pembayaran} />
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>{strings.pembayaran_title_1}</Text>
        <Text style={styles.textNominal}>
          Rp. {formatter.formatStringToCurrencyNumber(nominal)}
        </Text>
        <Text style={styles.textTitle}>{strings.pembayaran_title_2}</Text>
        {renderBankList()}
        {renderBankList()}
        {renderBankList()}
        <ButtonText
          buttonContainerStyle={{
            position: 'absolute',
            bottom: 20,
            marginHorizontal: sizes.padding,
            width: '90%',
          }}
          text={strings.konfirmasi}
          icon={icons.arrow_right_button_white}
          iconLocation={'right'}
          onPress={navigateToSuccessScreen}
        />
      </View>
    </SafeAreaView>
  );
};
export default TopupPembayaranScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: sizes.padding * 2,
  },
  textTitle: { fontSize: 15, color: colors.bodyText, textAlign: 'center' },
  textNominal: {
    fontSize: 38,
    color: colors.primary,
    fontWeight: '700',
    marginVertical: sizes.padding,
  },
});
