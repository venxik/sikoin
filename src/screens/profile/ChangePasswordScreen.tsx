/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { Button, HeaderBack, Popup1Button, TextInputForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { navigateAndReset } from '../../config/navigation';
import { ProfileStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';
import { resetUserData } from '../../redux/reducers/HomeReducer';
import {
  ChangePasswordForm,
  fetchChangePassword,
  setChangePasswordStatus,
} from '../../redux/reducers/LoginReducer';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ChangePasswordScreen'>;

const ChangePasswordScreen: React.FC<Props> = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const { changePasswordStatus } = useAppSelector((s) => s.LoginReducer);

  useEffect(() => {
    if (changePasswordStatus === 'success') {
      setShowPopup(true);
    }
  }, [changePasswordStatus]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    defaultValues: {
      passwordLama: '',
      password: '',
      confPassword: '',
    },
    reValidateMode: 'onSubmit',
  });

  const submitData = (data: ChangePasswordForm) => {
    dispatch(fetchChangePassword(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Popup1Button
        headerImage={icons.popup_success}
        headerText={
          'Kamu berhasil mengubah kata sandi kamu, silahkan masuk ke aplikasi dengan menggunakan kata sandi yang baru ya'
        }
        showPopup={showPopup}
        onPress={() => {
          setShowPopup(false);
          dispatch(setChangePasswordStatus('idle'));
          dispatch(resetUserData());
          navigateAndReset('LoginScreen');
        }}
      />
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderBack title={'Ubah Kata Sandi'} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="passwordLama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  title={'Kata Sandi Lama'}
                  error={errors.passwordLama}
                  errorText={errors.passwordLama?.message}
                  secureTextEntry
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  title={'Kata Sandi Baru'}
                  error={errors.password}
                  errorText={errors.password?.message}
                  secureTextEntry
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="confPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  title={'Verifikasi Kata Sandi Baru'}
                  error={errors.confPassword}
                  errorText={errors.confPassword?.message}
                  secureTextEntry
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
                validate: {
                  required: (value) => {
                    if (value !== watch().password) return 'Password harus sama!';
                  },
                },
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        onPress={handleSubmit(submitData)}
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
export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
