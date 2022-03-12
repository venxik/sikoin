import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ButtonText,
  Popup1Button,
  Popup2Button,
  TextboxBorder,
} from '../../components';
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { formatter } from '../../utils';
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [resetEmail, setResetEmail] = useState(null);
  const [showForgetPassModal, setShowForgetPassModal] = useState(false);
  const [showForgetPassSuccessModal, setShowForgetPassSuccessModal] =
    useState(false);

  const onChangeResetPassEmailText = value => {
    setResetEmail(value);
  };

  const navigateToDaftarKoperasi = () => {
    navigation.navigate('DaftarKoperasiStackNavigator');
  };

  const navigateToHomeScreen = data => {
    console.log(data);
    navigation.navigate('BottomTab');
  };

  const resetPassword = () => {
    if (isEmpty(resetEmail)) {
      setShowForgetPassModal(false);
      setShowForgetPassSuccessModal(true);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const renderCustomPopupContent = () => (
    <View style={styles.customPopupContainer}>
      <TextboxBorder
        style={styles.customPopupTextbox}
        value={resetEmail}
        onChangeText={e => onChangeResetPassEmailText(e)}
        secureTextEntry={false}
        placeholder={strings.email_textbox_placeholder}
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
            <TextboxBorder
              error={errors.email}
              errorText={errors.email?.message}
              value={value}
              onChangeText={e => onChange(e)}
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
            <TextboxBorder
              error={errors.password}
              errorText={errors.password?.message}
              style={{ marginTop: 10 }}
              value={value}
              onChangeText={e => onChange(e)}
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
          <ButtonText
            shadow={false}
            onPress={handleSubmit(navigateToHomeScreen)}
            text={strings.masuk}
          />
          <ButtonText
            shadow={false}
            onPress={navigateToDaftarKoperasi}
            buttonContainerStyle={{
              marginTop: SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text={strings.daftar_ke_koperasimu}
          />
          <ButtonText
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
  customPopupTextbox: {
    marginHorizontal: SCREEN_WIDTH * 0.1,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 5,
  },
  logo: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
});
