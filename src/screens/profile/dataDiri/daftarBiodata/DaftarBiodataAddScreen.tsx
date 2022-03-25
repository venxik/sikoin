import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  ButtonText,
  CalendarPicker,
  DropdownForm,
  HeaderBack,
  TextInputForm,
} from '../../../../components';
import { colors, dropdownItems, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  addBiodata,
  BiodataData,
} from '../../../../redux/reducers/BiodataReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../config/store/ReduxStore';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarBiodataAddScreen'
>;

const DaftarBiodataAddScreen: React.FC<Props> = ({ navigation }) => {
  const { biodataData } = useAppSelector(s => s.BiodataReducer) || {};
  const {
    tempatLahir,
    tanggalLahir,
    gender,
    golDarah,
    kewarganegaraan,
    pendidikanTerakhir,
    agama,
    statusPernikahan,
    jumlahAnak,
    pekerjaan,
    detailPekerjaan,
    bank,
    noRek,
  } = biodataData || {};

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BiodataData>({
    defaultValues: {
      tempatLahir: tempatLahir ? tempatLahir : '',
      tanggalLahir: tanggalLahir ? tanggalLahir : '',
      jumlahAnak: jumlahAnak ? jumlahAnak : '',
      detailPekerjaan: detailPekerjaan ? detailPekerjaan : '',
      bank: bank ? bank : '',
      noRek: noRek ? noRek : '',
      gender: gender ? gender : '',
      golDarah: golDarah ? golDarah : '',
      kewarganegaraan: kewarganegaraan ? kewarganegaraan : '',
      pendidikanTerakhir: pendidikanTerakhir ? pendidikanTerakhir : '',
      agama: agama ? agama : '',
      statusPernikahan: statusPernikahan ? statusPernikahan : '',
      pekerjaan: pekerjaan ? pekerjaan : '',
    },
  });

  const submitData = (data: BiodataData) => {
    const { tanggalLahir } = data || {};
    dispatch(
      addBiodata({
        ...data,
        tanggalLahir: tanggalLahir?.toString(),
      }),
    );
    navigation.goBack();
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
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <DropdownForm
                    error={errors.gender}
                    errorText={errors.gender?.message}
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
              name="noRek"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_rekening}
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
                  value={value}
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
              name="detailPekerjaan"
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

      <ButtonText
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
