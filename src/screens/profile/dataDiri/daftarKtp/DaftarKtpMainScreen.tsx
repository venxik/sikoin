/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import DocumentPicker from 'react-native-document-picker';

import { Button, HeaderBack } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { colors, icons, images, SCREEN_HEIGHT, sizes, strings } from '../../../../constants';
import { fetchKtpDokumen } from '../../../../redux/reducers/KtpReducer';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarKtpMainScreen'>;

const DaftarKtpMainScreen: React.FC<Props> = ({ navigation }) => {
  const documentPickerOptions = {
    type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
  };

  const { ktpData, ktpDokumen } = useAppSelector((s) => s.KtpReducer);
  const { noKtp, gambarKtp } = ktpData || {};
  const { linkGambarKtp } = ktpDokumen || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchKtpDokumen());
  }, []);

  const navigateToAddScreen = () => {
    navigation.navigate('DaftarKtpAddScreen');
  };

  const copyToClipboard = () => {
    Clipboard.setString(noKtp?.toString() ?? '');
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      console.warn('Dokumen Pendukung :', data);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (e: unknown) => console.error('Document picker error! ', e);
    }
  };

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={
            !isEmpty(linkGambarKtp)
              ? { uri: linkGambarKtp }
              : !isEmpty(gambarKtp)
              ? { uri: gambarKtp }
              : images.dummy_ktp
          }
          style={styles.imageKtp}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: sizes.padding,
            alignItems: 'center',
          }}
        >
          <Text style={styles.textStyle}>{noKtp ? noKtp : '-'}</Text>
          {!isEmpty(noKtp) && (
            <TouchableOpacity onPress={copyToClipboard}>
              <Image source={icons.icon_copy_clipboard} style={styles.iconClipboard} />
            </TouchableOpacity>
          )}
        </View>
        <Button
          shadow={false}
          onPress={() => navigateToAddScreen()}
          text={strings.ubah_data_ktp}
          buttonContainerStyle={{ marginBottom: sizes.padding }}
        />
        <Button
          shadow={false}
          onPress={openDocumentPicker}
          text={'Tambah Dokumen Pendukung'}
          secondary
          buttonContainerStyle={{ marginBottom: sizes.padding }}
        />
        <Button
          shadow={false}
          text={'Tambah Selfie'}
          secondary
          onPress={() => navigation.navigate('DaftarKtpSelfieScreen')}
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
    fontFamily: 'Poppins-Medium',
    color: colors.bodyTextLightGrey,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  iconClipboard: {
    width: sizes.padding,
    height: sizes.padding,
    marginLeft: sizes.padding,
  },
});
