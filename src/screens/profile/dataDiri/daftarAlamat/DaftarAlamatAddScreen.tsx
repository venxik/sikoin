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
import { Button, HeaderBack, TextInputForm } from '../../../../components';
import { colors, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  addAlamat,
  AlamatDataRequest,
  fetchSubmitAlamat,
  fetchUpdateAlamat,
  updateAlamat,
} from '../../../../redux/reducers/AlamatReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarAlamatAddScreen'
>;

const DaftarAlamatAddScreen: React.FC<Props> = ({ route }) => {
  const { update, item, index } = route.params;
  const {
    id,
    judul,
    detail,
    no_rt,
    no_rw,
    provinsi,
    kabupaten,
    kecamatan,
    kode_pos,
  } = item || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<AlamatDataRequest>({
    defaultValues: {
      judul: update ? judul : '',
      alamat: update ? detail : '',
      provinsi: update ? provinsi : '',
      kabupaten: update ? kabupaten : '',
      kecamatan: update ? kecamatan : '',
      kode_pos: update ? kode_pos : '',
      rt: update ? no_rt : '',
      rw: update ? no_rw : '',
    },
  });

  const onSubmit = (data: AlamatDataRequest) => {
    if (update) {
      dispatch(fetchUpdateAlamat({ data, id: id as number }));
      // dispatch(updateAlamat({ index, data }));
    } else {
      dispatch(fetchSubmitAlamat(data));
      dispatch(addAlamat(data));
    }
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
                  onChangeText={value => onChange(value)}
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
                  onChangeText={value => onChange(value)}
                  title={strings.alamat_lengkap}
                  multiline
                />
              )}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controller
                control={control}
                name="rt"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputForm
                    textBoxStyle={{ width: '70%' }}
                    style={{ width: '45%' }}
                    value={value}
                    onChangeText={value => onChange(value)}
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
                    onChangeText={value => onChange(value)}
                    title={strings.rw}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="provinsi"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.provinsi}
                />
              )}
            />
            <Controller
              control={control}
              name="kabupaten"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kabupaten}
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
                  onChangeText={value => onChange(value)}
                  title={strings.kecamatan}
                />
              )}
            />

            <Controller
              control={control}
              name="kode_pos"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kodepos}
                  keyboardType="numeric"
                  maxLength={5}
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
            />
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
