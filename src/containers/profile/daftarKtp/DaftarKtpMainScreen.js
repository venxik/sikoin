import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ButtonText, HeaderBack } from '../../../components';
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../constants';

const DaftarKtpMainScreen = () => {
  const navigation = useNavigation();

  const { ktpData } = useSelector(s => s.KtpReducer) || {};
  const { noKtp, gambarKtp } = ktpData || {};

  const navigateToAddScreen = () => {
    navigation.navigate('DaftarKtpAddScreen');
  };

  const copyToClipboard = text => {
    Clipboard.setString(text.toString());
  };

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={
            !isEmpty(gambarKtp)
              ? { uri: `data:image/jpg;base64,${gambarKtp}` }
              : images.dummy_ktp
          }
          style={styles.imageKtp}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: sizes.padding,
            alignItems: 'center',
          }}>
          <Text style={styles.textStyle}>{noKtp ? noKtp : '-'}</Text>
          {!isEmpty(noKtp) && (
            <TouchableOpacity onPress={copyToClipboard}>
              <Image
                source={icons.icon_copy_clipboard}
                style={styles.iconClipboard}
              />
            </TouchableOpacity>
          )}
        </View>
        <ButtonText
          shadow={false}
          onPress={() => navigateToAddScreen()}
          text={strings.ubah_data_ktp}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.ktp} />
      {renderKtpCard()}
    </SafeAreaView>
  );
};
export default DaftarKtpMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.bodyTextLightGrey,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  iconClipboard: { width: 20, height: 20, marginLeft: sizes.padding },
});
