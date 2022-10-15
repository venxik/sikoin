/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { Button, DropdownForm, HeaderBack, TextInputForm } from '../../../../components';
import { useAppDispatch } from '../../../../config';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../../../constants';
import {
  fetchSubmitRefKeluarga,
  fetchUpdateRefKeluarga,
  RefKeluargaResponse,
} from '../../../../redux/reducers/RefKeluargaReducer';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarRefKeluargaAddScreen'>;

const DaftarRefKeluargaAddScreen: React.FC<Props> = ({ route, navigation }) => {
  const { update, item } = route.params;
  const { status, telp, nama, ktp, id } = item || {};

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RefKeluargaResponse>({
    defaultValues: {
      status: update ? status : '',
      telp: update ? telp : '',
      nama: update ? nama : '',
      ktp: update ? ktp : '',
    },
  });

  const onSubmit = (data: RefKeluargaResponse) => {
    if (update) {
      dispatch(fetchUpdateRefKeluarga({ data, id: id as number }));
    } else {
      dispatch(fetchSubmitRefKeluarga(data));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderBack onPress={() => navigation.goBack()} title={strings.referensi_keluarga} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="nama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.nama}
                />
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.status_ref}
                  data={dropdownItems.statusKeluarga}
                  onChange={(value) => onChange(value)}
                  value={value}
                  maxHeight={200}
                />
              )}
            />
            <Controller
              control={control}
              name="ktp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.ktp}
                  errorText={errors.ktp?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.no_ktp}
                  maxLength={16}
                  keyboardType="number-pad"
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
                minLength: { value: 16, message: 'Nomor KTP harus 16 angka' },
              }}
            />
            <Controller
              control={control}
              name="telp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.telp}
                  errorText={errors.telp?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.no_telp}
                  maxLength={13}
                  keyboardType="number-pad"
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        onPress={handleSubmit(onSubmit)}
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
export default DaftarRefKeluargaAddScreen;

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
