import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Popup1Button, Popup2Button, TextInputBorder } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { ParentStackParamList } from '../../config/navigation/model';
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import {
  fetchForgotPassword,
  fetchLogin,
  setForgotPasswordStatus,
} from '../../redux/reducers/LoginReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<ParentStackParamList, 'LoginScreen'>;
type FormValues = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [resetEmail, setResetEmail] = useState<string>('');
  const [showForgetPassModal, setShowForgetPassModal] = useState(false);
  const [showForgetPassSuccessModal, setShowForgetPassSuccessModal] = useState(false);
  const { forgotPasswordStatus } = useAppSelector((s) => s.LoginReducer);

  useEffect(() => {
    if (forgotPasswordStatus === 'success') {
      setResetEmail('');
      setShowForgetPassModal(false);
      setShowForgetPassSuccessModal(true);
      dispatch(setForgotPasswordStatus('idle'));
    }
  }, [forgotPasswordStatus]);

  const onChangeResetPassEmailText = (value: string) => {
    setResetEmail(value);
  };

  const navigateToDaftarKoperasi = () => {
    navigation.navigate('DaftarKoperasiStep1Screen');
  };

  const doLogin = (data: FormValues) => {
    dispatch(fetchLogin({ email: data.email, password: data.password }));
  };

  const resetPassword = () => {
    if (!isEmpty(resetEmail)) {
      dispatch(fetchForgotPassword(resetEmail));
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: 'wardtabi@gmail.com',
      password: 'pass',
    },
  });

  const renderCustomPopupContent = () => (
    <View style={styles.customPopupContainer}>
      <TextInputBorder
        style={styles.customPopupTextInput}
        value={resetEmail}
        onChangeText={(e) => onChangeResetPassEmailText(e)}
        placeholder={strings.email_textbox_placeholder}
        keyboardType={'email-address'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Popup2Button
        buttonLeftOnPress={() => setShowForgetPassModal(false)}
        buttonRightOnPress={resetPassword}
        buttonLeftTitle={strings.tutup}
        buttonRightTitle={strings.reset}
        headerText={strings.popup_lupa_password_title}
        contentText={strings.popup_lupa_password_desc}
        showPopup={showForgetPassModal}
        headerImage={icons.icon_info_popup}
        customContent={renderCustomPopupContent()}
      />
      <Popup1Button
        headerText={strings.popup_lupa_password_success_title}
        contentText={strings.popup_lupa_password_success_desc}
        showPopup={showForgetPassSuccessModal}
        onPress={() => setShowForgetPassSuccessModal(false)}
        headerImage={icons.popup_success}
      />
      <Image source={images.login_hi} style={styles.logo} />
      <View style={{ width: '100%', paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              error={errors.email}
              errorText={errors.email?.message}
              value={value}
              onChangeText={(e) => onChange(e)}
              placeholder={strings.email_textbox_placeholder}
              icon={icons.icon_email}
              keyboardType={'email-address'}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${strings.email} ${strings.tidak_boleh_kosong}`,
            },
            pattern: {
              value: formatter.EMAIL_REGEX,
              message: `${strings.format} ${strings.email} ${strings.salah}`,
            },
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              error={errors.password}
              errorText={errors.password?.message}
              style={{ marginTop: 10 }}
              value={value}
              onChangeText={(e) => onChange(e)}
              placeholder={strings.password_textbox_placeholder}
              icon={icons.icon_password}
              secureTextEntry={true}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${strings.password} ${strings.tidak_boleh_kosong}`,
            },
          }}
        />

        <View style={{ width: '100%', marginTop: sizes.padding }}>
          <Button shadow={false} onPress={handleSubmit(doLogin)} text={strings.masuk} />
          <Button
            shadow={false}
            onPress={navigateToDaftarKoperasi}
            buttonContainerStyle={{
              marginTop: SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text={strings.daftar_ke_koperasimu}
          />
          <Button
            shadow={false}
            onPress={() => setShowForgetPassModal(true)}
            buttonContainerStyle={{
              marginTop: SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalLightPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text={strings.lupa_password}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customPopupContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: sizes.padding,
  },
  customPopupTextInput: {
    width: '100%',
  },
  logo: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
});
