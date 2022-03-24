/* eslint-disable react/prop-types */
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonText, HeaderBack, TextInputForm } from '../../../components';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../constants';
import { addKtpNumber } from '../../../redux/reducers/KtpReducer';
import { useForm, Controller } from 'react-hook-form';
import DocumentPicker from 'react-native-document-picker';

const DaftarKtpAddScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const documentPickerOptions = {
    type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
  };

  const { ktpData } = useSelector(s => s.KtpReducer) || {};
  const { noKtp, gambarKtp } = ktpData || {};

  const submitKtp = data => {
    console.log(data);
    if (data) {
      dispatch(addKtpNumber(data.noKtp));
      navigation.goBack();
    }
  };

  const changeKtpImage = () => {
    navigation.navigate('DaftarKtpCameraScreen');
    // setKtpImage(images.dummy_ktp);
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      console.log('Dokumen Pendukung :', data);
    } catch {
      e => console.log('Document picker error! ', e);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
                ? { uri: `data:image/jpg;base64,${gambarKtp}` }
                : icons.icon_edit_profile_picture
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
          rules={{
            required: { value: true, message: 'KTP Harus Diisi' },
            minLength: { value: 16, message: 'KTP Harus 16 Digit' },
          }}
        />

        <ButtonText
          onPress={openDocumentPicker}
          text={'Tambah Dokumen Pendukung'}
          secondary
          buttonContainerStyle={{ marginBottom: sizes.padding }}
        />
        <ButtonText
          text={'Tambah Selfie'}
          secondary
          onPress={() => navigation.navigate('DaftarKtpSelfieScreen')}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.ubah_ktp}
      />

      {renderKtpCard()}

      <ButtonText
        onPress={handleSubmit(submitKtp)}
        buttonContainerStyle={{
          position: 'absolute',
          bottom: sizes.padding,
          width: '90%',
          marginHorizontal: sizes.padding,
        }}
        text={strings.simpan}
      />
    </SafeAreaView>
  );
};
export default DaftarKtpAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
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
