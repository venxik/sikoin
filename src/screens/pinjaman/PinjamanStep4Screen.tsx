import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { ButtonText, HeaderPinjaman, TextInputForm } from '../../components';
import { PinjamanStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<PinjamanStackParamList, 'PinjamanStep4'>;

const PinjamanStep4: React.FC<Props> = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState<string>('email');
  const [nameValue, setNameValue] = useState<string>('nama');
  const [phoneValue, setPhoneValue] = useState<string>('noTelp');

  const onChangeEmail = (e: string) => {
    setEmailValue(e);
  };

  const onChangeName = (e: string) => {
    setNameValue(e);
  };

  const onChangePhone = (e: string) => {
    setPhoneValue(e);
  };

  const navigateToStep3 = () => {
    navigation.dispatch(() => {
      return CommonActions.reset({
        index: 1,
        routes: [{ name: 'HomeTab' }],
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderPinjaman index={4} />
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
            shadow
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <ButtonText
            onPress={navigateToStep3}
            shadow
            text={strings.simpan}
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
    marginTop: sizes.padding,
  },
});