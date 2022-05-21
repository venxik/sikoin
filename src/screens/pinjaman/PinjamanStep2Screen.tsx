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
  CalendarPicker,
  DropdownForm,
  HeaderPinjaman,
  TextInputForm,
} from '../../components';
import { PinjamanStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import { BiodataResponse } from '../../redux/reducers/BiodataReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<
  PinjamanStackParamList,
  'PinjamanStep2Screen'
>;

const PinjamanStep2: React.FC<Props> = ({ navigation }) => {
  const navigateToStep3 = (data: BiodataResponse) => {
    console.log('navigateToStep3', data);
    navigation.navigate('PinjamanStep3Screen');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BiodataResponse>({
    defaultValues: {
      tempatLahir: '',
      tanggalLahir: '',
      jumlahAnak: 0,
      bank: '',
      noRek: '',
      jenisKelamin: '',
      golDarah: '',
      kewarganegaraan: '',
      pendidikanTerakhir: '',
      agama: '',
      statusPernikahan: '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
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
                  onChangeText={value => onChange(value)}
                  title={strings.tempat_lahir}
                />
              )}
            />
            <Controller
              control={control}
              name="tanggalLahir"
              render={({ field: { onChange, value } }) => (
                <CalendarPicker
                  title={strings.tgl_lahir}
                  onChangeDate={date => {
                    onChange(date);
                  }}
                  value={value}
                />
              )}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controller
                control={control}
                name="jenisKelamin"
                render={({ field: { onChange, value } }) => (
                  <DropdownForm
                    style={{ width: '55%' }}
                    title={strings.jenis_kelamin}
                    data={dropdownItems.genderItem}
                    onChange={value => onChange(value)}
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
                    onChange={value => onChange(value)}
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
                  onChange={value => onChange(value)}
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
                  onChange={value => onChange(value)}
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
                  onChange={value => onChange(value)}
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
                  onChange={value => onChange(value)}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="jumlahAnak"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value.toString()}
                  onChangeText={value => onChange(value)}
                  title={strings.jumlah_anak}
                />
              )}
            />
            <Controller
              control={control}
              name="noRek"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.noRek}
                  errorText={errors.noRek?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_rekening}
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
              name="bank"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.bank}
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
    marginTop: sizes.padding,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
