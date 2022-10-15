import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, HeaderPinjaman, TextInputForm } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { fetchPinjamanStep2 } from '../../redux/reducers/PinjamanReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep1Screen'>;

const PinjamanStep1: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { email, noTelp, nama } = useAppSelector((s) => s.PinjamanReducer.pinjamanStep1Data);

  const navigateToStep2 = () => {
    dispatch(fetchPinjamanStep2());
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <HeaderPinjaman index={1} />
        <View
          style={{
            padding: sizes.padding,
            marginVertical: sizes.padding,
            backgroundColor: colors.white,
            borderRadius: sizes.padding,
          }}
        >
          <TextInputForm value={nama} title={strings.nama} disableEdit />
          <TextInputForm value={noTelp} title={strings.no_telp} disableEdit />
          <TextInputForm value={email} title={strings.email} disableEdit />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            width: '100%',
          }}
        >
          <Button
            onPress={() => navigation.goBack()}
            secondary
            text={strings.kembali}
            shadow
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={navigateToStep2}
            text={strings.lanjutkan}
            shadow
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PinjamanStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: sizes.padding,
  },
});
