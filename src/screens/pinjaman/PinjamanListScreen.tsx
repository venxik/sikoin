import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HeaderBack, PinjamanListItem } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { PengajuanPinjaman } from '../../redux/reducers/PinjamanReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanListScreen'>;

const PinjamanListScreen: React.FC<Props> = ({ navigation }) => {
  const { pengajuanPinjaman } = useAppSelector((s) => s.PinjamanReducer.pinjamanInitialData);

  const onPressPinjamanDetail = (item: PengajuanPinjaman) => {
    navigation.navigate('PinjamanDetailScreen', {
      id: item.id,
      status: item.status,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.pinjaman} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: sizes.padding,
        }}
      >
        <View style={styles.mainContainer}>
          {pengajuanPinjaman.map((item, i) => {
            if (item.status === 'SELESAI' || item.status === 'DITOLAK')
              return (
                <PinjamanListItem
                  item={item}
                  key={i}
                  disabled={item.status === 'SELESAI'}
                  onPress={() => onPressPinjamanDetail(item)}
                />
              );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PinjamanListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
  },
  textTitle: {
    fontFamily: 'Poppins-Regular',
    color: colors.bodyTextGrey,
  },
  textSubtitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: colors.bodyTextGrey,
    fontSize: 24,
  },
});
