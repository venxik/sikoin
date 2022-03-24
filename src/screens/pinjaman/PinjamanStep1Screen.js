import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { ButtonText, HeaderPinjaman, TextInputForm } from '../../components';
import { colors, sizes, strings } from '../../constants';

const PinjamanStep1 = () => {
  const navigation = useNavigation();

  const [emailValue, setEmailValue] = useState('email');
  const [nameValue, setNameValue] = useState('nama');
  const [phoneValue, setPhoneValue] = useState('noTelp');

  const onChangeEmail = e => {
    setEmailValue(e);
  };

  const onChangeName = e => {
    setNameValue(e);
  };

  const onChangePhone = e => {
    setPhoneValue(e);
  };

  const navigateToStep2 = () => {
    navigation.navigate('PinjamanStep2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderPinjaman index={1} />
        <View
          style={{
            padding: sizes.padding,
            marginVertical: sizes.padding,
            backgroundColor: colors.white,
            borderRadius: sizes.padding,
          }}>
          <TextInputForm
            value={nameValue}
            onChangeText={onChangeName}
            title={strings.nama}
          />
          <TextInputForm
            value={phoneValue}
            onChangeText={onChangePhone}
            title={strings.no_telp}
          />
          <TextInputForm
            value={emailValue}
            onChangeText={onChangeEmail}
            title={strings.email}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            width: '100%',
          }}>
          <ButtonText
            onPress={() => navigation.goBack()}
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <ButtonText
            onPress={navigateToStep2}
            text={strings.simpan}
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PinjamanStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: sizes.padding,
    marginTop: sizes.padding,
  },
});
