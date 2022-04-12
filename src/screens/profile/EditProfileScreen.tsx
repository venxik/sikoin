import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, HeaderBack, TextInputForm } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import {
  fetchUpdateProfile,
  ProfileRequest,
} from '../../redux/reducers/ProfileReducer';
import { useForm, Controller } from 'react-hook-form';
import { formatter } from '../../utils';
import DocumentPicker from 'react-native-document-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../config';
import { isEmpty } from 'lodash';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>;

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector(state => state.ProfileReducer) || {};
  const { nama, noAnggota, email, noTelp, profilePic } = profileData || {};
  const [profilePicture, setProfilePicture] = useState(profilePic);
  const documentPickerOptions = {
    type: [DocumentPicker.types.images],
  };

  const saveProfile = (data: ProfileRequest) => {
    const { email, nama, noTelp } = data || {};
    dispatch(
      fetchUpdateProfile({
        email,
        nama,
        noTelp: noTelp as string,
        profilePic: profilePicture as string | ImageSourcePropType,
      }),
    );
  };

  const openDocumentPicker = async () => {
    try {
      const data = await DocumentPicker.pickSingle(documentPickerOptions);
      console.log('Profile pic :', data);
      setProfilePicture(data.uri);
    } catch {
      (e: unknown) => console.log('Document picker error! ', e);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(noAnggota.toString());
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileRequest>({
    defaultValues: {
      email: email ? email : '',
      nama: nama ? nama : '',
      noTelp: noTelp ? noTelp : '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderBack
          onPress={() => navigation.goBack()}
          title={strings.edit_profile}
        />
        <ScrollView>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={openDocumentPicker}
              style={styles.profilePicStyle}>
              <ImageBackground
                imageStyle={styles.profilePicStyle}
                resizeMode="cover"
                source={{ uri: profilePicture }}>
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

            <View
              style={{ paddingHorizontal: 10, marginVertical: sizes.padding }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: sizes.padding,
                  alignItems: 'center',
                }}>
                <Text style={styles.codeText}>{noAnggota}</Text>
                {!isEmpty(noAnggota) && (
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Image
                      source={icons.icon_copy_clipboard}
                      style={styles.iconClipboard}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <Controller
                control={control}
                name="nama"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.nama}
                    errorText={errors.nama?.message}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.nama}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Nama tidak boleh kosong',
                  },
                }}
              />
              <Controller
                control={control}
                name="noTelp"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.noTelp}
                    errorText={errors.noTelp?.message}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.no_telp}
                    keyboardType={'number-pad'}
                    maxLength={13}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Nomor Telepon tidak boleh kosong',
                  },
                  pattern: {
                    value: formatter.NUMBER_REGEX,
                    message: 'Mohon isi no telepon yang benar',
                  },
                }}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.email}
                    errorText={errors.email?.message}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.email}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Email tidak boleh kosong',
                  },
                  pattern: {
                    value: formatter.EMAIL_REGEX,
                    message: 'Email Harus Benar',
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        shadow
        onPress={handleSubmit(saveProfile)}
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
export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  codeText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: colors.bodyTextLightGrey,
  },
  profilePicStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.25,
  },
  iconContainer: {
    borderRadius: SCREEN_WIDTH * 0.25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconClipboard: {
    width: sizes.padding,
    height: sizes.padding,
    marginLeft: sizes.padding,
  },
});
