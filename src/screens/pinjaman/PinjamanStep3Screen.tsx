import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, HeaderPinjaman, TextInputForm } from '../../components';
import { PinjamanStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<
  PinjamanStackParamList,
  'PinjamanStep3Screen'
>;

const PinjamanStep3: React.FC<Props> = ({ navigation }) => {
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
    navigation.navigate('PinjamanStep4Screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderPinjaman index={3} />
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
          <Button
            onPress={() => navigation.goBack()}
            shadow
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={navigateToStep3}
            shadow
            text={strings.lanjutkan}
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PinjamanStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: sizes.padding,
    marginTop: sizes.padding,
  },
});
