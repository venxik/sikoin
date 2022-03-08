import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profileData } = useSelector(state => state.ProfileReducer) || {};
  const { nama, code, email, noTelp, profilePic } = profileData || {};

  const [emailValue, setEmailValue] = useState(email);
  const [nameValue, setNameValue] = useState(nama);
  const [phoneValue, setPhoneValue] = useState(noTelp);

  const onChangeEmail = e => {
    setEmailValue(e);
  };

  const onChangeName = e => {
    setNameValue(e);
  };

  const onChangePhone = e => {
    setPhoneValue(e);
  };

  const saveProfile = () => {
    dispatch(
      updateProfile({
        email: emailValue,
        nama: nameValue,
        noTelp: phoneValue,
      }),
    );
    navigation.goBack();
  };

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
              <TextboxForm
                value={nameValue}
                onChangeText={onChangeName}
                title={strings.nama}
              />
              <TextboxForm
                value={phoneValue}
                onChangeText={onChangePhone}
                title={strings.no_telp}
              />
              <TextboxForm
                value={emailValue}
                onChangeText={onChangeEmail}
                title={strings.email}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonText
        shadow
        onPress={saveProfile}
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
