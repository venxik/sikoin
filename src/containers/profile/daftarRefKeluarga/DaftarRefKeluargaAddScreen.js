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
import {
  addKelToReducer,
  updateKelToReducer,
} from '../../../redux/actions/RefKeluargaAction';

const DaftarRefKeluargaAddScreen = ({ route }) => {
  const { params } = route || {};
  const { update, item, index } = params || {};
  const { status, noTelp, nama, noKtp } = item || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: update ? status : '',
      noTelp: update ? noTelp : '',
      nama: update ? nama : '',
      noKtp: update ? noKtp : '',
    },
  });

  const onSubmit = data => {
    if (update) {
      dispatch(updateKelToReducer({ index, data }));
    } else {
      dispatch(addKelToReducer(data));
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
              name="nama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.nama}
                />
              )}
              rules={{ required: true }}
            />

            <DropdownForm value={'Profile'} title={strings.status_ref} />

            <Controller
              control={control}
              name="noKtp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_ktp}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="noTelp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_telp}
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
export default DaftarRefKeluargaAddScreen;

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
