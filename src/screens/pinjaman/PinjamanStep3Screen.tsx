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
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import { PekerjaanResponse } from '../../redux/reducers/PekerjaanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep3Screen'>;

const PinjamanStep3: React.FC<Props> = ({ navigation }) => {
  const navigateToStep4 = (data: PekerjaanResponse) => {
    console.log('navigateToStep4: ', data);
    navigation.navigate('PinjamanStep4Screen');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PekerjaanResponse>({
    defaultValues: {
      pekerjaan: '',
      detailPekerjaan: '',
      masaKerjaTahun: 0,
      masaKerjaBulan: 0,
      gajiBulanan: '',
      namaPerusahaan: '',
      alamatKantor: '',
      provinsiKota: '',
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
            <Controller
              control={control}
              name="pekerjaan"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.pekerjaan}
                  data={dropdownItems.pekerjaanItem}
                  onChange={value => onChange(value)}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="detailPekerjaan"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.detail_pekerjaan}
                />
              )}
            />
            <Controller
              control={control}
              name="namaPerusahaan"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.nama_perusahaan}
                />
              )}
            />
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
                // <TextInputCurrency
                //   error={errors.gajiBulanan}
                //   errorText={errors.gajiBulanan?.message}
                //   value={value}
                //   onChangeValue={value => onChange(value)}
                //   title={strings.gaji_bulanan}
                //   keyboardType="number-pad"
                //   placeholder="Rp"
                // />
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
              name="alamatKantor"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.alamat_kantor}
                />
              )}
            />
            <Controller
              control={control}
              name="provinsiKota"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.provinsi_kota}
                />
              )}
            />
            <Controller
              control={control}
              name="provinsiKota"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.provinsi_kota}
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
