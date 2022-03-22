import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  TextboxCurrency,
  TextboxForm,
} from '../../../components';
import { colors, sizes, strings } from '../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { addPekerjaan } from '../../../redux/reducers/PekerjaanReducer';
import { formatter } from '../../../utils';

const DaftarPekerjaanAddScreen = () => {
  const { pekerjaanData } = useSelector(s => s.PekerjaanReducer) || {};
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

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      masaKerjaTahun: masaKerjaTahun ? masaKerjaTahun.toString() : '',
      masaKerjaBulan: masaKerjaBulan ? masaKerjaBulan.toString() : '',
      gajiBulanan: gajiBulanan ? gajiBulanan : 0,
      namaPerusahaan: namaPerusahaan ? namaPerusahaan : '',
      alamatKantor: alamatKantor ? alamatKantor : '',
      provinsiKota: provinsiKota ? provinsiKota : '',
      jabatanTerakhir: jabatanTerakhir ? jabatanTerakhir : '',
      noTelpKantor: noTelpKantor ? noTelpKantor : '',
    },
  });

  const submitData = data => {
    const { masaKerjaTahun, masaKerjaBulan, gajiBulanan } = data;
    dispatch(
      addPekerjaan({
        ...data,
        gajiBulanan: parseInt(gajiBulanan),
        masaKerjaTahun: parseInt(masaKerjaTahun),
        masaKerjaBulan: parseInt(masaKerjaBulan),
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
                  <TextboxForm
                    error={errors.masaKerjaTahun}
                    errorText={errors.masaKerjaTahun?.message}
                    style={{ width: '45%' }}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_tahun}
                    keyboardType="number-pad"
                  />
                )}
                // rules={{ pattern: formatter.NUMBER_REGEX }}
              />
              <Controller
                control={control}
                name="masaKerjaBulan"
                render={({ field: { onChange, value } }) => (
                  <TextboxForm
                    error={errors.masaKerjaBulan}
                    errorText={errors.masaKerjaBulan?.message}
                    style={{ width: '45%' }}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_bulan}
                    keyboardType="number-pad"
                  />
                )}
                // rules={{ pattern: formatter.NUMBER_REGEX }}
              />
            </View>
            <Controller
              control={control}
              name="gajiBulanan"
              render={({ field: { onChange, value } }) => (
                <TextboxCurrency
                  error={errors.gajiBulanan}
                  errorText={errors.gajiBulanan?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.gaji_bulanan}
                  keyboardType="number-pad"
                />
              )}
              // rules={{ pattern: formatter.NUMBER_REGEX }}
            />
            <Controller
              control={control}
              name="jabatanTerakhir"
              render={({ field: { onChange, value } }) => (
                <TextboxForm
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
                <TextboxForm
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
                <TextboxForm
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
                <TextboxForm
                  error={errors.noTelpKantor}
                  errorText={errors.noTelpKantor?.message}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_telp}
                  keyboardType="number-pad"
                />
              )}
              // rules={{ pattern: formatter.NUMBER_REGEX }}
            />
            <Controller
              control={control}
              name="provinsiKota"
              render={({ field: { onChange, value } }) => (
                <TextboxForm
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
