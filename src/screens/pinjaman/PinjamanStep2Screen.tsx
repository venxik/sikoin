/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  CalendarPicker,
  DropdownForm,
  HeaderPinjaman,
  TextInputForm,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import { fetchPinjamanStep3, PinjamanStep3Request } from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep2Screen'>;

const PinjamanStep2: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const {
    agama,
    detailPekerjaan,
    jenisKelamin,
    golDarah,
    jumlahAnak,
    kewarganegaraan,
    pekerjaan,
    pendidikanTerakhir,
    statusPernikahan,
    tanggalLahir,
    tempatLahir,
    referensi,
  } = useAppSelector((s) => s.PinjamanReducer.pinjamanStep2Data);

  const navigateToStep3 = (data: PinjamanStep3Request) => {
    dispatch(fetchPinjamanStep3(data));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinjamanStep3Request>({
    defaultValues: {
      tempatLahir,
      tanggalLahir,
      jumlahAnak,
      jenisKelamin,
      golDarah,
      kewarganegaraan,
      pendidikanTerakhir,
      agama,
      statusPernikahan,
      pekerjaan,
      detailPekerjaan,
      idRefPertama: referensi.length > 0 ? referensi[0].id : 0,
      namaRefPertama: referensi.length > 0 ? referensi[0].nama : '',
      statusRefPertama: referensi.length > 0 ? referensi[0].status : '',
      ktpRefPertama: referensi.length > 0 ? referensi[0].noKTP : '',
      telpRefPertama: referensi.length > 0 ? referensi[0].telp : '',
      idRefKedua: referensi.length > 1 ? referensi[1].id : 0,
      namaRefKedua: referensi.length > 1 ? referensi[1].nama : '',
      statusRefKedua: referensi.length > 1 ? referensi[1].status : '',
      ktpRefKedua: referensi.length > 1 ? referensi[1].noKTP : '',
      telpRefKedua: referensi.length > 1 ? referensi[1].telp : '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderPinjaman index={2} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="tempatLahir"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.tempat_lahir}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="tanggalLahir"
              render={({ field: { onChange, value } }) => (
                <CalendarPicker
                  title={strings.tgl_lahir}
                  onChangeDate={(date) => {
                    onChange(date);
                  }}
                  value={value}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controller
                control={control}
                name="jenisKelamin"
                render={({ field: { onChange, value } }) => (
                  <DropdownForm
                    style={{ width: '55%' }}
                    title={strings.jenis_kelamin}
                    data={dropdownItems.genderItem}
                    onChange={(value) => onChange(value)}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="golDarah"
                render={({ field: { onChange, value } }) => (
                  <DropdownForm
                    style={{ width: '40%' }}
                    title={strings.gol_darah}
                    data={dropdownItems.golDarahItem}
                    onChange={(value) => onChange(value)}
                    value={value}
                    maxHeight={200}
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="kewarganegaraan"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.kewarganegaraan}
                  data={dropdownItems.kewarganegaraanItem}
                  onChange={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="pendidikanTerakhir"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.pendidikan_terakhir}
                  data={dropdownItems.pendidikanItem}
                  onChange={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="agama"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.agama}
                  data={dropdownItems.agamaItem}
                  onChange={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="statusPernikahan"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.status_pernikahan}
                  data={dropdownItems.statusPernikahanItem}
                  onChange={(value) => onChange(value)}
                  value={value}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="jumlahAnak"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value?.toString()}
                  onChangeText={(value) => onChange(value)}
                  title={strings.jumlah_anak}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="pekerjaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.pekerjaan}
                  errorText={errors.pekerjaan?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.pekerjaan}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="detailPekerjaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.detailPekerjaan}
                  errorText={errors.detailPekerjaan?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.detail_pekerjaan}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="namaRefPertama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.namaRefPertama}
                  errorText={errors.namaRefPertama?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nama Referensi Keluarga 1'}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="statusRefPertama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.statusRefPertama}
                  errorText={errors.statusRefPertama?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Status Referensi'}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="ktpRefPertama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.ktpRefPertama}
                  errorText={errors.ktpRefPertama?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nomor KTP'}
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="telpRefPertama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.telpRefPertama}
                  errorText={errors.telpRefPertama?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nomor HP'}
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="namaRefKedua"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.namaRefKedua}
                  errorText={errors.namaRefKedua?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nama Referensi Keluarga 2'}
                />
              )}
            />
            <Controller
              control={control}
              name="statusRefKedua"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.statusRefKedua}
                  errorText={errors.statusRefKedua?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Status Referensi'}
                />
              )}
            />
            <Controller
              control={control}
              name="ktpRefKedua"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.ktpRefKedua}
                  errorText={errors.ktpRefKedua?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nomor KTP'}
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
              }}
            />
            <Controller
              control={control}
              name="telpRefKedua"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.telpRefKedua}
                  errorText={errors.telpRefKedua?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={'Nomor HP'}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            paddingHorizontal: sizes.padding,
            width: '100%',
          }}
        >
          <Button
            onPress={() => navigation.goBack()}
            shadow
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={handleSubmit(navigateToStep3)}
            shadow
            text={strings.lanjutkan}
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PinjamanStep2;

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
