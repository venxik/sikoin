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
  AlamatDataResponse,
  fetchSubmitAlamat,
  fetchUpdateAlamat,
} from '../../../../redux/reducers/AlamatReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarAlamatAddScreen'
>;

const DaftarAlamatAddScreen: React.FC<Props> = ({ route }) => {
  const { update, item } = route.params;
  const { id, judul, alamat, rt, rw, provinsi, kabupaten, kecamatan, kodePos } =
    item || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
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
              name="kodePos"
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
