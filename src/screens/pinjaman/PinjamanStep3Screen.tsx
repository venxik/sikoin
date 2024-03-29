/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { Button, DropdownForm, HeaderPinjaman, TextInputForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import { fetchPinjamanStep4, PinjamanStep3Data } from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep3Screen'>;

const PinjamanStep3: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const {
    alamatPt,
    bank,
    gajiBulanan,
    jabatan,
    kota,
    masaKerjaBulan,
    masaKerjaTahun,
    namaKantorCabang,
    namaPemilik,
    namaPt,
    noRek,
    noTelpPt,
    provinsi,
  } = useAppSelector((s) => s.PinjamanReducer.pinjamanStep3Data);

  const navigateToStep4 = (data: PinjamanStep3Data) => {
    dispatch(fetchPinjamanStep4({ ...data }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinjamanStep3Data>({
    defaultValues: {
      alamatPt,
      bank,
      masaKerjaTahun,
      masaKerjaBulan,
      gajiBulanan,
      jabatan,
      kota,
      namaKantorCabang,
      namaPemilik,
      namaPt,
      noRek,
      noTelpPt,
      provinsi,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderPinjaman index={3} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Controller
                control={control}
                name="masaKerjaTahun"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.masaKerjaTahun}
                    errorText={errors.masaKerjaTahun?.message}
                    style={{ width: '45%' }}
                    value={value?.toString()}
                    onChangeText={(value) => onChange(value)}
                    title={strings.masa_kerja_tahun}
                    keyboardType="number-pad"
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
                name="masaKerjaBulan"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.masaKerjaBulan}
                    errorText={errors.masaKerjaBulan?.message}
                    style={{ width: '45%' }}
                    value={value?.toString()}
                    onChangeText={(value) => onChange(value)}
                    title={strings.masa_kerja_bulan}
                    keyboardType="number-pad"
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
            </View>
            <Controller
              control={control}
              name="gajiBulanan"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.gaji_bulanan}
                  data={dropdownItems.gajiBualanan}
                  onChange={(value) => onChange(value)}
                  value={value}
                  maxHeight={200}
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="bank"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.bank}
                  errorText={errors?.bank?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Nama Bank"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="namaKantorCabang"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.namaKantorCabang}
                  errorText={errors?.namaKantorCabang?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Kantor Cabang"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="noRek"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.noRek}
                  errorText={errors?.noRek?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="No Rekening"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="namaPt"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.namaPt}
                  errorText={errors?.namaPt?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Nama Perusahaan / PT"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="jabatan"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.jabatan}
                  errorText={errors?.jabatan?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Jabatan"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="noTelpPt"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.noTelpPt}
                  errorText={errors?.noTelpPt?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Nomor Telepon Kantor"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="alamatPt"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.alamatPt}
                  errorText={errors?.alamatPt?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Alamat Kantor"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="provinsi"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.provinsi}
                  errorText={errors?.provinsi?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Provinsi"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
              }}
            />
            <Controller
              control={control}
              name="kota"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.kota}
                  errorText={errors?.kota?.message}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title="Kabupaten / Kota"
                />
              )}
              rules={{
                required: { value: true, message: 'Harus Di isi' },
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
            onPress={handleSubmit(navigateToStep4)}
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
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingTop: sizes.padding * 1.3,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
