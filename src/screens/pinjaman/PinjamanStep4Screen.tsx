import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { Button, HeaderPinjaman, TextInputForm } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import DocumentPicker from 'react-native-document-picker';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep4Screen'>;

const documentPickerOptions = {
  type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
};

const PinjamanStep4: React.FC<Props> = ({ navigation }) => {
  const { ktpData } = useAppSelector(s => s.KtpReducer) || {};
  const { noKtp, gambarKtp } = ktpData || {};

  const submitKtp = (data: { noKtp: string }) => {
    if (data) {
      navigation.navigate('PinjamanStep5Screen');
    }
  };

  const changeKtpImage = () => {
    navigation.navigate('DaftarKtpCameraScreen');
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      console.log('Dokumen Pendukung :', data);
    } catch {
      (e: unknown) => console.error('Document picker error! ', e);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ noKtp: string }>({
    defaultValues: {
      noKtp: noKtp ? noKtp : '',
    },
  });

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={changeKtpImage}>
          <ImageBackground
            imageStyle={styles.imageKtp}
            source={
              !isEmpty(gambarKtp)
                ? { uri: gambarKtp }
                : icons.icon_edit_profle_picture
            }
            style={styles.imageKtp}
            resizeMode="cover">
            <View style={styles.iconContainer}>
              <Image
                resizeMode="cover"
                source={icons.icon_edit_profle_picture}
                style={{
                  width: sizes.icon_size * 2,
                  height: sizes.icon_size * 2,
                }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Controller
          control={control}
          name="noKtp"
          render={({ field: { onChange, value } }) => (
            <TextInputForm
              error={errors.noKtp}
              errorText={errors.noKtp?.message}
              style={{ marginTop: sizes.padding }}
              value={value}
              onChangeText={onChange}
              title={strings.no_ktp}
              keyboardType={'numeric'}
              maxLength={16}
            />
          )}
          // rules={{
          //   required: { value: true, message: 'KTP Harus Diisi' },
          //   minLength: { value: 16, message: 'KTP Harus 16 Digit' },
          // }}
        />
        <TouchableOpacity onPress={changeKtpImage}>
          <ImageBackground
            imageStyle={styles.imageSelfie}
            source={
              !isEmpty(gambarKtp)
                ? { uri: gambarKtp }
                : icons.icon_edit_profle_picture
            }
            style={styles.imageSelfie}
            resizeMode="cover">
            <View style={styles.iconContainer}>
              <Image
                resizeMode="cover"
                source={icons.icon_edit_profle_picture}
                style={{
                  width: sizes.icon_size * 2,
                  height: sizes.icon_size * 2,
                }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Button
          shadow={false}
          onPress={openDocumentPicker}
          text={'Tambah Dokumen Pendukung'}
          secondary
          buttonContainerStyle={{ marginTop: 40 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderPinjaman index={4} />
        <ScrollView>{renderKtpCard()}</ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            width: '100%',
          }}>
          <Button
            onPress={() => navigation.goBack()}
            shadow
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={handleSubmit(submitKtp)}
            shadow
            text={strings.lanjutkan}
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PinjamanStep4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: sizes.padding,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  imageSelfie: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: sizes.padding,
    marginTop: 20,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
  },
  iconContainer: {
    borderRadius: sizes.padding,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
