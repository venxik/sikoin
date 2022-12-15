import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';

import { Button, HeaderBack } from '../../components';
import { useAppSelector } from '../../config';
import { ProfileStackParamList } from '../../config/navigation/model';
import { colors, icons, images, SCREEN_HEIGHT, sizes } from '../../constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'IDCardMainScreen'>;

const IDCardMainScreen: React.FC<Props> = ({ navigation }) => {
  const { idCardData } = useAppSelector((s) => s.ProfileReducer);
  const { foto, logoKoperasi, memberSejak, nama, namaKoperasi, noAnggota } = idCardData;

  const copyToClipboard = () => {
    Clipboard.setString(idCardData?.noAnggota as string);
  };

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <ImageBackground
          source={images.img_id_card_bg}
          style={styles.imageKtp}
          borderRadius={sizes.padding}
        >
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FastImage
              source={isEmpty(foto) ? images.dummy_profile_pic : { uri: logoKoperasi }}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                backgroundColor: colors.white,
                borderRadius: 30,
              }}
            />
            <Text style={styles.textIdCardTitle}>Kartu Anggota</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <FastImage
              source={isEmpty(foto) ? images.dummy_profile_pic : { uri: foto }}
              style={{ width: 100, height: 100, backgroundColor: colors.white, borderRadius: 100 }}
            />
            <View>
              <Text
                style={styles.textIdCard}
                adjustsFontSizeToFit
                numberOfLines={1}
              >{`Nama : ${nama}`}</Text>
              <Text
                style={styles.textIdCard}
                adjustsFontSizeToFit
                numberOfLines={1}
              >{`Nomor ID : ${noAnggota}`}</Text>
              <Text
                style={styles.textIdCard}
                adjustsFontSizeToFit
                numberOfLines={1}
              >{`Member Sejak : ${
                isEmpty(memberSejak)
                  ? dayjs().format('DD-MM-YYYY')
                  : dayjs(memberSejak).format('DD-MM-YYYY')
              }`}</Text>
              <Text
                style={styles.textIdCard}
                adjustsFontSizeToFit
                numberOfLines={1}
              >{`Nama Koperasi: ${namaKoperasi}`}</Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: sizes.padding,
            alignItems: 'center',
          }}
        >
          <Text style={styles.textStyle}>{noAnggota}</Text>
          {!isEmpty(noAnggota) && (
            <TouchableOpacity onPress={copyToClipboard}>
              <Image source={icons.icon_copy_clipboard} style={styles.iconClipboard} />
            </TouchableOpacity>
          )}
        </View>
        <Button
          shadow={false}
          onPress={() => null}
          text={'Unduh ID Card'}
          // buttonContainerStyle={{ marginBottom: sizes.padding }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={'ID Card'} />
      {renderKtpCard()}
    </SafeAreaView>
  );
};
export default IDCardMainScreen;

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
    fontFamily: 'Poppins-Medium',
    color: colors.bodyTextLightGrey,
  },
  textIdCard: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.bodyText,
    textAlign: 'center',
  },
  textIdCardTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.bodyTextGrey,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  iconClipboard: {
    width: sizes.padding,
    height: sizes.padding,
    marginLeft: sizes.padding,
  },
});
