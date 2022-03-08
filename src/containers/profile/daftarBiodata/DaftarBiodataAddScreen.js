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
import {
  ButtonText,
  DropdownForm,
  HeaderBack,
  TextboxForm,
} from '../../../components';
import { colors, sizes, strings } from '../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { BiodataAction } from '../../../redux/actions';

const DaftarBiodataAddScreen = ({ route }) => {
  const { params } = route || {};
  const { update, data } = params || {};
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
  } = data || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tempatLahir: update ? tempatLahir : '',
      jumlahAnak: update ? jumlahAnak : '',
      detailPekerjaan: update ? detailPekerjaan : '',
    },
  });

  const submitData = data => {
    // dispatch(BiodataAction.addBiodataToReducer(data));
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
          title={strings.biodata}
        />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="tempatLahir"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.tempat_lahir}
                />
              )}
              rules={{ required: true }}
            />
            <DropdownForm
              value={update ? tanggalLahir : strings.pilih_dot}
              title={strings.tgl_lahir}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <DropdownForm
                style={{ width: '45%' }}
                value={update ? gender : strings.pilih_dot}
                title={strings.gender}
              />
              <DropdownForm
                style={{ width: '45%' }}
                value={update ? golDarah : strings.pilih_dot}
                title={strings.gol_darah}
              />
            </View>
            <DropdownForm
              value={update ? kewarganegaraan : strings.pilih_dot}
              title={strings.kewarganegaraan}
            />
            <DropdownForm
              value={update ? pendidikanTerakhir : strings.pilih_dot}
              title={strings.pendidikan_terakhir}
            />
            <DropdownForm
              value={update ? agama : strings.pilih_dot}
              title={strings.agama}
            />
            <DropdownForm
              value={update ? statusPernikahan : strings.pilih_dot}
              title={strings.status_pernikahan}
            />
            <Controller
              control={control}
              name="jumlahAnak"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.jumlah_anak}
                />
              )}
              rules={{ required: true }}
            />
            <DropdownForm
              value={update ? pekerjaan : strings.pilih_dot}
              title={strings.pekerjaan}
            />
            <Controller
              control={control}
              name="detailPekerjaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.detail_pekerjaan}
                />
              )}
              rules={{ required: true }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonText
        shadow
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
