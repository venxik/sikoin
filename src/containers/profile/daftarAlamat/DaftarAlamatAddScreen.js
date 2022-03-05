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
import {
  addAlamatToReducer,
  updateAlamatToReducer,
} from '../../../redux/actions/AlamatAction';

const DaftarAlamatAddScreen = ({ route }) => {
  const { params } = route || {};
  const { update, item, index } = params || {};
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
  } = useForm({
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

  const onSubmit = data => {
    if (update) {
      dispatch(updateAlamatToReducer({ index, data }));
    } else {
      dispatch(addAlamatToReducer(data));
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
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.judul_alamat}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="alamatLengkap"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.alamat_lengkap}
                  multiline
                />
              )}
              rules={{ required: true }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controller
                control={control}
                name="rt"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextboxForm
                    textBoxStyle={{ width: '70%' }}
                    style={{ width: '45%' }}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.rt}
                    keyboardType="numeric"
                    onBlur={onBlur}
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="rw"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextboxForm
                    textBoxStyle={{ width: '70%' }}
                    style={{ width: '45%' }}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={value => onChange(value)}
                    title={strings.rw}
                    keyboardType="numeric"
                  />
                )}
                rules={{ required: true }}
              />
            </View>
            <Controller
              control={control}
              name="provinsi"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.provinsi}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="kabupaten"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kabupaten}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="kecamatan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kecamatan}
                />
              )}
              rules={{ required: true }}
            />

            <Controller
              control={control}
              name="kodepos"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.kodepos}
                  keyboardType="numeric"
                />
              )}
              rules={{ required: true }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonText
        shadow
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
