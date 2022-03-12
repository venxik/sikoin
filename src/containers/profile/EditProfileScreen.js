import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonText, HeaderBack, TextboxForm } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { updateProfile } from '../../redux/reducers/ProfileReducer';
import { useForm, Controller } from 'react-hook-form';
import { formatter } from '../../utils';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profileData } = useSelector(state => state.ProfileReducer) || {};
  const { nama, code, email, noTelp, profilePic } = profileData || {};

  const saveProfile = data => {
    console.log(data);
    const { email, nama, noTelp } = data || {};
    dispatch(
      updateProfile({
        email,
        nama,
        noTelp,
      }),
    );
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
            <ImageBackground source={profilePic} style={styles.profilePicStyle}>
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
            <View
              style={{ paddingHorizontal: 10, marginVertical: sizes.padding }}>
              <View
                style={{ flexDirection: 'row', marginBottom: sizes.padding }}>
                <Text style={styles.codeText}>{code}</Text>
              </View>
              <Controller
                control={control}
                name="nama"
                render={({ field: { onChange, value } }) => (
                  <TextboxForm
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
                  <TextboxForm
                    error={errors.noTelp}
                    errorText={errors.noTelp?.message}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.no_telp}
                    keyboardType={'number-pad'}
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
                  <TextboxForm
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

      <ButtonText
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
    fontWeight: '500',
    color: colors.bodyTextLightGrey,
  },
  profilePicStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
  },
  iconContainer: {
    borderRadius: SCREEN_WIDTH * 0.25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
