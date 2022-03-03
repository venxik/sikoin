import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  ProfilePicture,
  TextboxForm,
} from '../../components';
import { colors, sizes, strings } from '../../constants';
import { setProfileDataToReducer } from '../../redux/actions/ProfileAction';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profileData } = useSelector(state => state.ProfileDataReducer);
  const { name, code, email, noTelp } = profileData || {};

  const [emailValue, setEmailValue] = useState(email);
  const [nameValue, setNameValue] = useState(name);
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
      setProfileDataToReducer({
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
            <ProfilePicture />
            <View
              style={{ paddingHorizontal: 10, marginVertical: sizes.padding }}>
              <View
                style={{ flexDirection: 'row', marginBottom: sizes.padding }}>
                <Text style={styles.codeText}>{code}</Text>
              </View>
              <TextboxForm
                style={{ marginBottom: sizes.padding }}
                value={nameValue}
                onChangeText={onChangeName}
                title={strings.nama}
              />
              <TextboxForm
                style={{ marginBottom: sizes.padding }}
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
});
