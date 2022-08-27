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
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, dropdownItems, sizes, strings } from '../../constants';
import {
  fetchPinjamanStep3,
  PinjamanStep2Data,
} from '../../redux/reducers/PinjamanReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep2Screen'>;

const PinjamanStep2: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const {
    agama,
    detailPekerjaan,
    gender,
    golDarah,
    jumlahAnak,
    kewarganegaraan,
    pekerjaan,
    pendidikanTerakhir,
    statusPernikahan,
    tanggalLahir,
    tempatLahir,
    idJenisPinjaman,
  } = useAppSelector(s => s.PinjamanReducer.pinjamanStep2Data);

  const navigateToStep3 = (data: PinjamanStep2Data) => {
    dispatch(fetchPinjamanStep3({ ...data, idJenisPinjaman }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinjamanStep2Data>({
    defaultValues: {
      tempatLahir,
      tanggalLahir,
      jumlahAnak,
      gender,
      golDarah,
      kewarganegaraan,
      pendidikanTerakhir,
      agama,
      statusPernikahan,
      pekerjaan,
      detailPekerjaan,
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
                name="gender"
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
                  value={value?.toString()}
                  onChangeText={value => onChange(value)}
                  title={strings.jumlah_anak}
                />
              )}
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
                  onChangeText={value => onChange(value)}
                  title={strings.pekerjaan}
                />
              )}
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
                  onChangeText={value => onChange(value)}
                  title={strings.detail_pekerjaan}
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
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
