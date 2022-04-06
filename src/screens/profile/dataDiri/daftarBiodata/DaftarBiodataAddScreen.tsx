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
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { formatter } from '../../../../utils';
import moment from 'moment';
import {
  BiodataResponse,
  fetchUpdateBiodata,
} from '../../../../redux/reducers/BiodataReducer';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarBiodataAddScreen'
>;

const DaftarBiodataAddScreen: React.FC<Props> = ({ navigation }) => {
  const { biodataData } = useAppSelector(s => s.BiodataReducer) || {};
  const {
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    gol_darah,
    kewarganegaraan,
    pendidikan_terakhir,
    agama,
    status_pernkahan,
    jumlah_anak,
    pekerjaan,
    detail_pekerjaan,
    bank,
    no_rek,
  } = biodataData || {};

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BiodataResponse>({
    defaultValues: {
      tempat_lahir: tempat_lahir ? tempat_lahir : '',
      tanggal_lahir: tanggal_lahir ? tanggal_lahir : '',
      jumlah_anak: jumlah_anak ? jumlah_anak : 0,
      detail_pekerjaan: detail_pekerjaan ? detail_pekerjaan : '',
      bank: bank ? bank : '',
      no_rek: no_rek ? no_rek : '',
      jenis_kelamin: jenis_kelamin ? jenis_kelamin : '',
      gol_darah: gol_darah ? gol_darah : '',
      kewarganegaraan: kewarganegaraan ? kewarganegaraan : '',
      pendidikan_terakhir: pendidikan_terakhir ? pendidikan_terakhir : '',
      agama: agama ? agama : '',
      status_pernkahan: status_pernkahan ? status_pernkahan : '',
      pekerjaan: pekerjaan ? pekerjaan : '',
    },
  });

  const submitData = (data: BiodataResponse) => {
    const { tanggal_lahir } = data || {};
    dispatch(
      fetchUpdateBiodata({
        ...data,
        tanggal_lahir: moment(tanggal_lahir).format(),
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
              name="tempat_lahir"
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
              name="tanggal_lahir"
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
                name="jenis_kelamin"
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
                name="gol_darah"
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
              name="pendidikan_terakhir"
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
            <Controller
              control={control}
              name="no_rek"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.no_rek}
                  errorText={errors.no_rek?.message}
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
              name="status_pernkahan"
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
              name="jumlah_anak"
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
              name="detail_pekerjaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.detail_pekerjaan}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
