import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  'PinjamanStep1Screen'
>;

const PinjamanStep1: React.FC<Props> = ({ navigation }) => {
  const navigateToStep2 = (data: {
    email: string;
    nama: string;
    noTelp: string;
  }) => {
    console.log('navigateToStep2: ', data);
    navigation.navigate('PinjamanStep2Screen');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      nama: '',
      noTelp: '',
    },
  });

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
          <Controller
            control={control}
            name="nama"
            render={({ field: { onChange, value } }) => (
              <TextInputForm
                error={errors.nama}
                errorText={errors.nama?.message}
                value={value}
                onChangeText={onChange}
                title={strings.nama}
              />
            )}
          />
          <Controller
            control={control}
            name="noTelp"
            render={({ field: { onChange, value } }) => (
              <TextInputForm
                error={errors.noTelp}
                errorText={errors.noTelp?.message}
                value={value}
                onChangeText={onChange}
                title={strings.no_telp}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInputForm
                error={errors.email}
                errorText={errors.email?.message}
                value={value}
                onChangeText={onChange}
                title={strings.email}
              />
            )}
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
            secondary
            text={strings.kembali}
            shadow
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={handleSubmit(navigateToStep2)}
            text={strings.lanjutkan}
            shadow
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
  },
});
