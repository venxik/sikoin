import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

import { Button, HeaderPinjaman, TextInputForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import { fetchPatchCreatePinjaman } from '../../redux/reducers/PinjamanReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep4Screen'>;

const documentPickerOptions = {
  type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
};

const PinjamanStep4: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { linkGambarKtp, noKtp, linkSelfieKtp } = useAppSelector(
    (s) => s.PinjamanReducer.pinjamanStep4Data,
  );
  const { ktpData } = useAppSelector((s) => s.KtpReducer) || {};
  const { gambarKtp, gambarSelfie } = ktpData || {};

  const [dokumenPendukung, setDokumenPendukung] = useState<DocumentPickerResponse>();

  const submitKtp = (data: { noKtp: string }) => {
    const formData = new FormData();
    formData.append('noKtp', data.noKtp);
    if (!isEmpty(gambarKtp)) {
      formData.append('gambarKtp', {
        uri: gambarKtp,
        type: 'image/jpeg',
        name: 'ktp image',
      });
    }
    if (!isEmpty(gambarSelfie)) {
      formData.append('selfieKtp', {
        uri: gambarSelfie,
        type: 'image/jpeg',
        name: 'selfie image',
      });
    }
    if (!isEmpty(dokumenPendukung)) {
      formData.append('dokumenPendukung', {
        uri: dokumenPendukung?.uri,
        type: dokumenPendukung?.type,
        name: dokumenPendukung?.name,
      });
    }
    dispatch(fetchPatchCreatePinjaman(formData));
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      setDokumenPendukung(data);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
    if (!isEmpty(linkGambarKtp) && isEmpty(gambarKtp)) return { uri: linkGambarKtp };
    else if (!isEmpty(gambarKtp)) return { uri: gambarKtp };
    else return icons.icon_edit_profle_picture;
  };

  const checkSelfieImage = () => {
    if (!isEmpty(linkSelfieKtp) && isEmpty(gambarSelfie)) return { uri: linkSelfieKtp };
    else if (!isEmpty(gambarSelfie)) return { uri: gambarSelfie };
    else return icons.icon_edit_profle_picture;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ noKtp: string }>({
    defaultValues: {
      noKtp,
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
            resizeMode="cover"
          >
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
        <TouchableOpacity onPress={changeSelfieImage} style={{ marginTop: sizes.padding }}>
          <ImageBackground
            imageStyle={styles.imageSelfie}
            source={checkSelfieImage()}
            style={styles.imageSelfie}
            resizeMode="cover"
          >
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
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderPinjaman index={4} />
        <ScrollView>{renderKtpCard()}</ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            width: '100%',
          }}
        >
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
