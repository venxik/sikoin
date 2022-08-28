import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Button,
  DropdownForm,
  HeaderPinjaman,
  TextInputForm,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import {
  fetchPinjamanStep4,
  PinjamanStep3Data,
} from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep3Screen'>;

const PinjamanStep3: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const {
    alamatKantor,
    bank,
    gajiBulanan,
    jabatanTerakhir,
    kota,
    masaKerjaBulan,
    masaKerjaTahun,
    namaKantorCabang,
    namaPemilik,
    namaPerusahaan,
    noRek,
    noTelpPt,
    provinsi,
  } = useAppSelector(s => s.PinjamanReducer.pinjamanStep3Data);

  const navigateToStep4 = (data: PinjamanStep3Data) => {
    dispatch(fetchPinjamanStep4({ ...data }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinjamanStep3Data>({
    defaultValues: {
      alamatKantor,
      bank,
      masaKerjaTahun,
      masaKerjaBulan,
      gajiBulanan,
      jabatanTerakhir,
      kota,
      namaKantorCabang,
      namaPemilik,
      namaPerusahaan,
      noRek,
      noTelpPt,
      provinsi,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderPinjaman index={3} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Controller
                control={control}
                name="masaKerjaTahun"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.masaKerjaTahun}
                    errorText={errors.masaKerjaTahun?.message}
                    style={{ width: '45%' }}
                    value={value?.toString()}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_tahun}
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
              <Controller
                control={control}
                name="masaKerjaBulan"
                render={({ field: { onChange, value } }) => (
                  <TextInputForm
                    error={errors.masaKerjaBulan}
                    errorText={errors.masaKerjaBulan?.message}
                    style={{ width: '45%' }}
                    value={value?.toString()}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_bulan}
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
            <Controller
              control={control}
              name="gajiBulanan"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.gaji_bulanan}
                  data={dropdownItems.gajiBualanan}
                  onChange={value => onChange(value)}
                  value={value}
                  maxHeight={200}
                />
              )}
            />
            <Controller
              control={control}
              name="bank"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.bank}
                  errorText={errors?.bank?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Nama Bank"
                />
              )}
            />
            <Controller
              control={control}
              name="namaKantorCabang"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.namaKantorCabang}
                  errorText={errors?.namaKantorCabang?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Kantor Cabang"
                />
              )}
            />
            <Controller
              control={control}
              name="noRek"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.noRek}
                  errorText={errors?.noRek?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="No Rekening"
                />
              )}
            />
            <Controller
              control={control}
              name="namaPerusahaan"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.namaPerusahaan}
                  errorText={errors?.namaPerusahaan?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Nama Perusahaan / PT"
                />
              )}
            />
            <Controller
              control={control}
              name="jabatanTerakhir"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.jabatanTerakhir}
                  errorText={errors?.jabatanTerakhir?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Jabatan"
                />
              )}
            />
            <Controller
              control={control}
              name="noTelpPt"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.noTelpPt}
                  errorText={errors?.noTelpPt?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Nomor Telepon Kantor"
                />
              )}
            />
            <Controller
              control={control}
              name="alamatKantor"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.alamatKantor}
                  errorText={errors?.alamatKantor?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Alamat Kantor"
                />
              )}
            />
            <Controller
              control={control}
              name="provinsi"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.provinsi}
                  errorText={errors?.provinsi?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Provinsi"
                />
              )}
            />
            <Controller
              control={control}
              name="kota"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors?.kota}
                  errorText={errors?.kota?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title="Kabupaten / Kota"
                />
              )}
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
          }}>
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
