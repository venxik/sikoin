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
import { ButtonText, HeaderBack, TextInputForm } from '../../../../components';
import { colors, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  addAlamat,
  AlamatData,
  updateAlamat,
} from '../../../../redux/reducers/AlamatReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarAlamatAddScreen'
>;

const DaftarAlamatAddScreen: React.FC<Props> = ({ route }) => {
  const { update, item, index } = route.params;
  const {
    judul,
    alamatLengkap,
    rt,
    rw,
    provinsi,
    kabupaten,
    kecamatan,
    kodepos,
  } = item || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AlamatData>({
    defaultValues: {
      judul: update ? judul : '',
      alamatLengkap: update ? alamatLengkap : '',
      provinsi: update ? provinsi : '',
      kabupaten: update ? kabupaten : '',
      kecamatan: update ? kecamatan : '',
      kodepos: update ? kodepos : '',
      rt: update ? rt : '',
      rw: update ? rw : '',
    },
  });

  const onSubmit = (data: AlamatData) => {
    if (update) {
      dispatch(updateAlamat({ index, data }));
    } else {
      dispatch(addAlamat(data));
    }
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
              name="alamatLengkap"
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
              name="kodepos"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kodepos}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonText
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
