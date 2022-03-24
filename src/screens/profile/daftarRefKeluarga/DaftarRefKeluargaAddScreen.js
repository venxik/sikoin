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
  TextInputForm,
} from '../../../components';
import { colors, sizes, strings } from '../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  addKeluarga,
  updateKeluarga,
} from '../../../redux/reducers/RefKeluargaReducer';

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
      dispatch(updateKeluarga({ index, data }));
    } else {
      dispatch(addKeluarga(data));
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
          title={strings.referensi_keluarga}
        />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="nama"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.nama}
                />
              )}
            />

            {/* <DropdownForm value={'Profile'} title={strings.status_ref} /> */}

            <Controller
              control={control}
              name="noKtp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_ktp}
                />
              )}
            />
            <Controller
              control={control}
              name="noTelp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_telp}
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
export default DaftarRefKeluargaAddScreen;

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
