/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button, DropdownForm, HeaderBack, TextInputForm } from '../../../../components';
import { useAppSelector } from '../../../../config';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { colors, SCREEN_HEIGHT, sizes, strings } from '../../../../constants';
import {
  AlamatDataResponse,
  fetchCityProvince,
  fetchSubmitAlamat,
  fetchUpdateAlamat,
} from '../../../../redux/reducers/AlamatReducer';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarAlamatAddScreen'>;

const DaftarAlamatAddScreen: React.FC<Props> = ({ route }) => {
  const { update, item } = route.params;
  const { id, judul, alamat, rt, rw, provinsi, kabupaten, kecamatan, kodePos } = item || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { kota: kotaList, provinsi: provinsiList } = useAppSelector(
    (s) => s.AlamatReducer.cityProvinceList,
  );

  useEffect(() => {
    dispatch(fetchCityProvince());
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<AlamatDataResponse>({
    defaultValues: {
      judul: update ? judul : '',
      alamat: update ? alamat : '',
      provinsi: update ? provinsi : '',
      kabupaten: update ? kabupaten : '',
      kecamatan: update ? kecamatan : '',
      kodePos: update ? kodePos : '',
      rt: update ? rt : '',
      rw: update ? rw : '',
    },
  });

  const kotaListFiltered = useMemo(() => {
    const index = provinsiList.findIndex((x) => x.nama === watch().provinsi);
    if (index != -1) {
      const selectedProvince = provinsiList[index];
      const temp = kotaList.filter((x) => x.provinsiId === selectedProvince.id);
      return temp;
    }
    return kotaList;
  }, [watch().provinsi]);

  const selectedKodePos = useMemo(() => {
    const index = kotaList.findIndex((x) => x.cityId === watch().kabupaten);
    if (index != -1) {
      const selectedKota = kotaList[index].kodePos;
      return selectedKota;
    }
    return '';
  }, [watch().kabupaten]);

  const onSubmit = (data: AlamatDataResponse) => {
    if (update) {
      dispatch(fetchUpdateAlamat({ data, id: id as number }));
      // dispatch(updateAlamat({ index, data }));
    } else {
      dispatch(fetchSubmitAlamat(data));
      // dispatch(addAlamat(data));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderBack
          onPress={() => navigation.goBack()}
          title={update ? strings.ubah_alamat : strings.tambah_alamat}
        />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="judul"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.judul_alamat}
                />
              )}
            />
            <Controller
              control={control}
              name="alamat"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.alamat_lengkap}
                  multiline
                />
              )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controller
                control={control}
                name="rt"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputForm
                    textBoxStyle={{ width: '70%' }}
                    style={{ width: '45%' }}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    title={strings.rt}
                    keyboardType="numeric"
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                name="rw"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputForm
                    textBoxStyle={{ width: '70%' }}
                    style={{ width: '45%' }}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    title={strings.rw}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="provinsi"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.provinsi}
                  data={provinsiList}
                  onChange={(value) => onChange(value)}
                  value={value}
                  labelField="nama"
                  valueField="nama"
                  maxHeight={SCREEN_HEIGHT * 0.5}
                />
              )}
            />
            <Controller
              control={control}
              name="kabupaten"
              render={({ field: { onChange, value } }) => (
                <DropdownForm
                  title={strings.kabupaten_kota}
                  data={kotaListFiltered}
                  onChange={(value) => onChange(value)}
                  value={value}
                  labelField="nama"
                  valueField="cityId"
                  disable={watch().provinsi == ''}
                  maxHeight={SCREEN_HEIGHT * 0.5}
                />
              )}
            />
            <Controller
              control={control}
              name="kecamatan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  title={strings.kecamatan}
                />
              )}
            />
            <TextInputForm
              value={selectedKodePos}
              title={strings.kodepos}
              keyboardType="numeric"
              maxLength={5}
              disableEdit
            />
            {/* <Controller
              control={control}
              name="kodePos"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={selectedKodePos}
                  onChangeText={(value) => onChange(value)}
                  title={strings.kodepos}
                  keyboardType="numeric"
                  maxLength={5}
                  disableEdit
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
                minLength: {
                  value: 5,
                  message: 'Kode Pos harus 5 angka',
                },
              }}
            /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        onPress={handleSubmit(onSubmit)}
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
export default DaftarAlamatAddScreen;

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
