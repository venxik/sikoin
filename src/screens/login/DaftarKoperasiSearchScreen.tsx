import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBack, TextInputBorder } from '../../components';
import {
  colors,
  icons,
  namaKoperasiDummy,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DaftarKoperasiParamList } from '../../config/navigation/model';

type Props = NativeStackScreenProps<
  DaftarKoperasiParamList,
  'DaftarKoperasiSearchScreen'
>;

const DaftarKoperasiSearchScreen: FC<Props> = ({ navigation }) => {
  const [koperasi, setKoperasi] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>();

  const onChangeKoperasi = (value: string) => {
    setKoperasi(value);
    if (value.length > 2) {
      const result = namaKoperasiDummy.filter(value =>
        value.nama.includes(koperasi),
      );
      console.log(result);

      setData(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      <View style={styles.bottomContainer}>
        <TextInputBorder
          value={koperasi}
          onChangeText={e => onChangeKoperasi(e)}
          placeholder={strings.masukan_nama_koperasimu}
          icon={icons.icon_pencil_textbox}
        />
        <FlatList
          data={koperasi.length > 2 ? data : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <Text style={{ color: colors.bodyText }}>{item.nama}</Text>;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default DaftarKoperasiSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: sizes.padding,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
  },
  topInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {
    marginLeft: 16,
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
  },
  textTitle2: {
    marginTop: 16,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  bottomContainer: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    margin: SCREEN_WIDTH * 0.05,
    padding: sizes.padding,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  textCircle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.bodyText,
  },
});
