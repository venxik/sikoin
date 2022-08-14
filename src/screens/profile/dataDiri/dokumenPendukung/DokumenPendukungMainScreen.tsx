import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { HeaderBack, ListEmptyDataComponent } from '../../../../components';
import { ProfileStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { sizes, strings } from '../../../../constants';
import { fetchAlamatList } from '../../../../redux/reducers/AlamatReducer';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'DaftarAlamatMainScreen'
>;

const DokumenPendukungMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { alamatList } = useAppSelector(s => s.AlamatReducer) || [];

  useEffect(() => {
    dispatch(fetchAlamatList());
  }, []);

  const navigateToAddScreen = () => {
    console.log('TEST');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.daftar_alamat}
      />
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
