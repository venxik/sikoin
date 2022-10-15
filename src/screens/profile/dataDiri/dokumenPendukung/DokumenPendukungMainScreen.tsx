import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, ListEmptyDataComponent } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { sizes, strings } from '../../../../constants';
import { fetchAlamatList } from '../../../../redux/reducers/AlamatReducer';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DaftarAlamatMainScreen'>;

const DokumenPendukungMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { alamatList } = useAppSelector((s) => s.AlamatReducer) || [];

  useEffect(() => {
    dispatch(fetchAlamatList());
  }, []);

  const navigateToAddScreen = () => {
    console.warn('TEST');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={'Dokumen Pendukung'} />
      <FlatList
        data={alamatList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
          flexGrow: 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              <ListEmptyDataComponent
                text={strings.tambah_alamat}
                onPress={() => navigateToAddScreen()}
              />
            </View>
          );
        }}
        renderItem={() => {
          return <Text>Test</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default DokumenPendukungMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
