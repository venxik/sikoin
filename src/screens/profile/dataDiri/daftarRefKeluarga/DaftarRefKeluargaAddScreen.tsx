import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Button, HeaderBack, TextInputForm } from '../../../../components';
import { colors, sizes, strings } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import {
  fetchSubmitRefKeluarga,
  fetchUpdateRefKeluarga,
  RefKeluargaRequest,
} from '../../../../redux/reducers/RefKeluargaReducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch } from '../../../../config';
import { formatter } from '../../../../utils';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarRefKeluargaAddScreen'
>;

const DaftarRefKeluargaAddScreen: React.FC<Props> = ({ route, navigation }) => {
  const { update, item } = route.params;
  const { status, noTelp, nama, noKtp, id } = item || {};

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RefKeluargaRequest>({
    defaultValues: {
      status: update ? status : '',
      noTelp: update ? noTelp : '',
      nama: update ? nama : '',
      noKtp: update ? noKtp : '',
    },
  });

  const onSubmit = (data: RefKeluargaRequest) => {
    if (update) {
      dispatch(fetchUpdateRefKeluarga({ data, id: id as number }));
      // dispatch(updateKeluarga({ index, data }));
    } else {
      dispatch(fetchSubmitRefKeluarga(data));
      // dispatch(addKeluarga(data));
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
                  error={errors.noKtp}
                  errorText={errors.noKtp?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_ktp}
                  maxLength={16}
                  keyboardType="number-pad"
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
                },
                minLength: { value: 16, message: 'Nomor KTP harus 16 angka' },
              }}
            />
            <Controller
              control={control}
              name="noTelp"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputForm
                  error={errors.noTelp}
                  errorText={errors.noTelp?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_telp}
                  maxLength={13}
                  keyboardType="number-pad"
                />
              )}
              rules={{
                pattern: {
                  value: formatter.NUMBER_REGEX,
                  message: 'Format harus dalam bentuk angka',
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
