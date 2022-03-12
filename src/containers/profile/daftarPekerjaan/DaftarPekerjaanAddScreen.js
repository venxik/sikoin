import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ButtonText, HeaderBack, TextboxForm } from '../../../components';
import { colors, sizes, strings } from '../../../constants';
import { useForm, Controller } from 'react-hook-form';

const DaftarPekerjaanAddScreen = ({ route }) => {
  const { params } = route || {};
  const { update, data } = params || {};
  const {
    masaKerjaTahun,
    masaKerjaBulan,
    gajiBulanan,
    bank,
    noRekening,
    namaPerusahaan,
    alamatKantor,
    provinsiKota,
  } = data || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      masaKerjaTahun: update ? masaKerjaTahun : '',
      masaKerjaBulan: update ? masaKerjaBulan : '',
      gajiBulanan: update ? gajiBulanan : '',
      bank: update ? bank : '',
      noRekening: update ? noRekening : '',
      namaPerusahaan: update ? namaPerusahaan : '',
      alamatKantor: update ? alamatKantor : '',
      provinsiKota: update ? provinsiKota : '',
    },
  });

  const submitData = data => {
    console.log(data);
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
          title={strings.kepegawaian}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextboxForm
                    style={{ width: '45%' }}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_tahun}
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="masaKerjaBulan"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextboxForm
                    style={{ width: '45%' }}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.masa_kerja_bulan}
                  />
                )}
                rules={{ required: true }}
              />
            </View>
            <Controller
              control={control}
              name="gajiBulanan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.gaji_bulanan}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="bank"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.bank}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="noRekening"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_rekening}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="namaPerusahaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.nama_perusahaan}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="alamatKantor"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.alamat_kantor}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="provinsiKota"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.provinsi_kota}
                />
              )}
              rules={{ required: true }}
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
