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
  DropdownForm,
  HeaderBack,
  TextInputCurrency,
  TextInputForm,
} from '../../../../components';
import { colors, dropdownItems, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  fetchUpdatePekerjaan,
  PekerjaanResponse,
} from '../../../../redux/reducers/PekerjaanReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarPekerjaanAddScreen'
>;

const DaftarPekerjaanAddScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { pekerjaanData } = useAppSelector(s => s.PekerjaanReducer) || {};
  const {
    pekerjaan,
    detailPekerjaan,
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    namaPerusahaan,
    alamatKantor,
    provinsiKota,
  } = pekerjaanData || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PekerjaanResponse>({
    defaultValues: {
      pekerjaan: pekerjaan ? pekerjaan : '',
      detailPekerjaan: detailPekerjaan ? detailPekerjaan : '',
      masaKerjaTahun: masaKerjaTahun ? masaKerjaTahun : 0,
      masaKerjaBulan: masaKerjaBulan ? masaKerjaBulan : 0,
      gajiBulanan: gajiBulanan ? gajiBulanan : '',
      namaPerusahaan: namaPerusahaan ? namaPerusahaan : '',
      alamatKantor: alamatKantor ? alamatKantor : '',
      provinsiKota: provinsiKota ? provinsiKota : '',
    },
  });

  const submitData = (data: PekerjaanResponse) => {
    // const { masaKerjaTahun, masaKerjaBulan, gajiBulanan } = data;
    dispatch(fetchUpdatePekerjaan(data));
    // dispatch(
    //   addPekerjaan({
    //     ...data,
    //     gajiBulanan: gajiBulanan,
    //     masaKerjaTahun: masaKerjaTahun,
    //     masaKerjaBulan: masaKerjaBulan,
    //   }),
    // );
    // navigation.goBack();
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
