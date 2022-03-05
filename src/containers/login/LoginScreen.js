import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonText,
  Popup1Button,
  Popup2Button,
  TextboxBorder,
} from '../../components';
import { colors, icons, images, sizes, strings } from '../../constants';
import { setEmailToReducer } from '../../redux/actions/LoginAction';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { email: emailFromReducer } = useSelector(state => state.LoginReducer);

  const [email, setEmail] = useState(emailFromReducer);
  const [password, setPassword] = useState(null);
  const [resetEmail, setResetEmail] = useState(null);
  const [showForgetPassModal, setShowForgetPassModal] = useState(false);
  const [showForgetPassSuccessModal, setShowForgetPassSuccessModal] =
    useState(false);

  const onChangeEmailText = value => {
    setEmail(value);
    // dispatch(setEmailToReducer(value));
  };

  const onChangePasswordText = value => {
    setPassword(value);
  };

  const onChangeResetPassEmailText = value => {
    setResetEmail(value);
  };

  const navigateToDaftarKoperasi = () => {
    navigation.navigate('DaftarKoperasiStackNavigator');
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('BottomTab');
  };

  const resetPassword = () => {
    if (isEmpty(resetEmail)) {
      setShowForgetPassModal(false);
      setShowForgetPassSuccessModal(true);
    }
  };

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
        customContent={
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              marginBottom: sizes.padding,
            }}>
            <TextboxBorder
              style={{
                marginHorizontal: SCREEN_WIDTH * 0.1,
                marginTop: 10,
                width: '100%',
                paddingHorizontal: 5,
              }}
              value={email}
              onChangeText={e => onChangeResetPassEmailText(e)}
              secureTextEntry={false}
              placeholder={strings.email_textbox_placeholder}
            />
          </View>
        }
      />
      <Popup1Button
        headerText={strings.popup_lupa_password_success_title}
        contentText={strings.popup_lupa_password_success_desc}
        showPopup={showForgetPassSuccessModal}
        onPress={() => setShowForgetPassSuccessModal(false)}
        headerImage={icons.popup_success}
      />
      <Image
        source={images.login_hi}
        style={{
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_WIDTH * 0.5,
          marginBottom: SCREEN_HEIGHT * 0.1,
        }}
      />
      <View style={{ width: '100%' }}>
        <TextboxBorder
          style={{
            marginHorizontal: SCREEN_WIDTH * 0.1,
          }}
          value={email}
          onChangeText={e => onChangeEmailText(e)}
          secureTextEntry={false}
          placeholder={strings.email_textbox_placeholder}
          icon={icons.icon_email}
        />
        <TextboxBorder
          style={{
            marginHorizontal: SCREEN_WIDTH * 0.1,
            marginTop: SCREEN_HEIGHT * 0.02,
          }}
          value={password}
          onChangeText={e => onChangePasswordText(e)}
          secureTextEntry={true}
          placeholder={strings.password_textbox_placeholder}
          icon={icons.icon_password}
        />

        <View style={{ width: '100%', marginTop: sizes.padding }}>
          <ButtonText
            onPress={navigateToHomeScreen}
            buttonContainerStyle={{
              marginHorizontal: SCREEN_WIDTH * 0.1,
              backgroundColor: colors.primary,
            }}
            text={strings.masuk}
          />
          <ButtonText
            onPress={navigateToDaftarKoperasi}
            buttonContainerStyle={{
              marginHorizontal: SCREEN_WIDTH * 0.1,
              marginTop: SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text={strings.daftar_ke_koperasimu}
          />
          <ButtonText
            onPress={() => setShowForgetPassModal(true)}
            buttonContainerStyle={{
              marginHorizontal: SCREEN_WIDTH * 0.1,
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
});
