import React from 'react';
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
  HeaderBack,
  TextInputForm,
} from '../../../../components';
import { colors, dropdownItems, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { formatter } from '../../../../utils';
import moment from 'moment';
import {
  BiodataResponse,
  fetchUpdateBiodata,
} from '../../../../redux/reducers/BiodataReducer';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'DaftarBiodataAddScreen'
>;

const DaftarBiodataAddScreen: React.FC<Props> = ({ navigation }) => {
  const { biodataData } = useAppSelector(s => s.BiodataReducer) || {};
  const {
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    golDarah,
    kewarganegaraan,
    pendidikanTerakhir,
    agama,
    statusPernikahan,
    jumlahAnak,
    bank,
    noRek,
  } = biodataData || {};

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BiodataResponse>({
    defaultValues: {
      tempatLahir: tempatLahir ? tempatLahir : '',
      tanggalLahir: tanggalLahir ? tanggalLahir : '',
      jumlahAnak: jumlahAnak ? jumlahAnak : 0,
      bank: bank ? bank : '',
      noRek: noRek ? noRek : '',
      jenisKelamin: jenisKelamin ? jenisKelamin : '',
      golDarah: golDarah ? golDarah : '',
      kewarganegaraan: kewarganegaraan ? kewarganegaraan : '',
      pendidikanTerakhir: pendidikanTerakhir ? pendidikanTerakhir : '',
      agama: agama ? agama : '',
      statusPernikahan: statusPernikahan ? statusPernikahan : '',
    },
  });

  const submitData = (data: BiodataResponse) => {
    const { tanggalLahir } = data || {};
    dispatch(
      fetchUpdateBiodata({
        ...data,
        tanggalLahir: tanggalLahir ?? moment(tanggalLahir).format(),
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderBack
          onPress={() => navigation.goBack()}
          title={strings.biodata}
        />
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
      </KeyboardAvoidingView>

      <Button
        onPress={handleSubmit(submitData)}
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
export default DaftarBiodataAddScreen;

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
