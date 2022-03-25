import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ButtonText, HeaderBack } from '../../../components';
import { TopupStackParamList } from '../../../config/navigation/model';
import { colors, icons, images, sizes, strings } from '../../../constants';
import { formatter } from '../../../utils';

type Props = NativeStackScreenProps<
  TopupStackParamList,
  'TopupPembayaranScreen'
>;

const TopupPembayaranScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nominal } = route.params;

  const navigateToSuccessScreen = () => {
    navigation.navigate('TopupSuccessScreen');
  };

  const renderBankList = () => (
    <View style={styles.bankContainer}>
      <Image source={images.img_bca} style={{ width: 100, height: 40 }} />
      <Text style={styles.textBankNo}>1231312321</Text>
      <Text style={styles.textBankName}>PT. XXXXXX</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        title={strings.pilih_pembayaran}
        textStyle={{ width: '100%' }}
      />
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
          shadow={false}
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
  textTitle: {
    fontSize: 15,
    color: colors.bodyText,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  textNominal: {
    fontSize: 38,
    color: colors.primary,
    fontFamily: 'Poppins-Bold',
    marginVertical: sizes.padding / 2,
  },
  bankContainer: { marginTop: sizes.padding, alignItems: 'center' },
  textBankNo: {
    color: colors.bodyText,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  textBankName: {
    color: colors.bodyText,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
});
