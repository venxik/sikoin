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
  HeaderBack,
  TextInputCurrency,
  TextInputForm,
} from '../../../../components';
import { colors, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  addPekerjaan,
  PekerjaanData,
} from '../../../../redux/reducers/PekerjaanReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../config/store/ReduxStore';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarPekerjaanAddScreen'
>;

const DaftarPekerjaanAddScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { pekerjaanData } = useAppSelector(s => s.PekerjaanReducer) || {};
  const {
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    namaPerusahaan,
    alamatKantor,
    provinsiKota,
    jabatanTerakhir,
    noTelpKantor,
  } = pekerjaanData || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PekerjaanData>({
    defaultValues: {
      masaKerjaTahun: masaKerjaTahun ? masaKerjaTahun : '',
      masaKerjaBulan: masaKerjaBulan ? masaKerjaBulan : '',
      gajiBulanan: gajiBulanan ? gajiBulanan : '',
      namaPerusahaan: namaPerusahaan ? namaPerusahaan : '',
      alamatKantor: alamatKantor ? alamatKantor : '',
      provinsiKota: provinsiKota ? provinsiKota : '',
      jabatanTerakhir: jabatanTerakhir ? jabatanTerakhir : '',
      noTelpKantor: noTelpKantor ? noTelpKantor : '',
    },
  });

  const submitData = (data: PekerjaanData) => {
    const { masaKerjaTahun, masaKerjaBulan, gajiBulanan } = data;
    dispatch(
      addPekerjaan({
        ...data,
        gajiBulanan: gajiBulanan,
        masaKerjaTahun: masaKerjaTahun,
        masaKerjaBulan: masaKerjaBulan,
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
          title={strings.pekerjaan}
        />
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
                    value={value}
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
                    value={value}
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
                <TextInputCurrency
                  error={errors.gajiBulanan}
                  errorText={errors.gajiBulanan?.message}
                  value={value}
                  onChangeValue={value => onChange(value)}
                  title={strings.gaji_bulanan}
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
              name="jabatanTerakhir"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.jabatan_terakhir}
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
              name="noTelpKantor"
              render={({ field: { onChange, value } }) => (
                <TextInputForm
                  error={errors.noTelpKantor}
                  errorText={errors.noTelpKantor?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_telp}
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
export default DaftarPekerjaanAddScreen;

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
