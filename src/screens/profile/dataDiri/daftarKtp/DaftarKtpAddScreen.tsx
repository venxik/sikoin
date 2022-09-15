import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Button, HeaderBack, TextInputForm } from '../../../../components';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../../constants';
import { fetchUploadGambarKtp } from '../../../../redux/reducers/KtpReducer';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { fetchKtpDokumen } from '../../../../redux/reducers/KtpReducer';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'DaftarKtpAddScreen'
>;

const documentPickerOptions = {
  type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
};

const DaftarKtpAddScreen: React.FC<Props> = ({ navigation }) => {
  const { ktpData, ktpDokumen } = useAppSelector(s => s.KtpReducer) || {};
  const { linkGambarKtp, linkSelfieKtp } = ktpDokumen || {};
  const { noKtp, gambarKtp, gambarSelfie } = ktpData || {};

  const [dokumenPendukung, setDokumenPendukung] =
    useState<DocumentPickerResponse>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchKtpDokumen());
  }, []);

  const submitKtp = (data: { noKtp: string }) => {
    const formData = new FormData();
    formData.append('noKtp', data.noKtp);
    if (!isEmpty(gambarKtp)) {
      console.log('gambarKtp');
      formData.append('gambarKtp', {
        uri: gambarKtp,
        type: 'image/jpeg',
        name: 'ktp image',
      });
    }
    if (!isEmpty(gambarSelfie)) {
      console.log('selfieKtp');
      formData.append('selfieKtp', {
        uri: gambarSelfie,
        type: 'image/jpeg',
        name: 'selfie image',
      });
    }
    if (!isEmpty(dokumenPendukung)) {
      console.log('dokumenPendukung');
      formData.append('dokumenPendukung', {
        uri: dokumenPendukung?.uri,
        type: dokumenPendukung?.type,
        name: dokumenPendukung?.name,
      });
    }
    dispatch(fetchUploadGambarKtp(formData));
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      setDokumenPendukung(data);
    } catch {
      (e: unknown) => console.error('Document picker error! ', e);
    }
  };

  const changeKtpImage = () => {
    navigation.navigate('DaftarKtpCameraScreen');
  };

  const changeSelfieImage = () => {
    navigation.navigate('DaftarKtpSelfieScreen');
  };

  const checkKtpImage = () => {
    if (!isEmpty(linkGambarKtp) && isEmpty(gambarKtp))
      return { uri: linkGambarKtp };
    else if (!isEmpty(gambarKtp)) return { uri: gambarKtp };
    else return icons.icon_edit_profle_picture;
  };

  const checkSelfieImage = () => {
    if (!isEmpty(linkSelfieKtp) && isEmpty(gambarSelfie))
      return { uri: linkSelfieKtp };
    else if (!isEmpty(gambarSelfie)) return { uri: gambarSelfie };
    else return icons.icon_edit_profle_picture;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ noKtp: string }>({
    defaultValues: {
      noKtp: noKtp,
    },
  });

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={changeKtpImage}>
          <ImageBackground
            imageStyle={styles.imageKtp}
            source={checkKtpImage()}
            style={styles.imageKtp}
            resizeMode="cover">
            <View style={styles.iconContainer}>
              <Image
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
        <TouchableOpacity
          onPress={changeSelfieImage}
          style={{ marginTop: sizes.padding }}>
          <ImageBackground
            imageStyle={styles.imageSelfie}
            source={checkSelfieImage()}
            style={styles.imageSelfie}
            resizeMode="cover">
            <View style={styles.iconContainer}>
              <Image
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
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.ubah_ktp}
      />

      {renderKtpCard()}

      <Button
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
  imageSelfie: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: sizes.padding,
  },
});
