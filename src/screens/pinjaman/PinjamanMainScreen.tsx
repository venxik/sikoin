import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBack,
  PinjamanHorizontalListItem,
  PinjamanItemModal,
  PinjamanListItem,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import {
  fetchGetPinjamanInitialData,
  fetchPinjamanStep1,
  JenisPinjaman,
  PengajuanPinjaman,
  setPinjamanInfo,
} from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';
import { Document } from 'react-native-iconly';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanMainScreen'>;

const PinjamanMainScreen: React.FC<Props> = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<JenisPinjaman | null>(null);

  const dispatch = useAppDispatch();
  const { pinjamanInitialData } = useAppSelector(s => s.PinjamanReducer);
  const { jenisPinjaman, pengajuanPinjaman, totalJumlahPinjamanDisetujui } =
    pinjamanInitialData;

  useEffect(() => {
    dispatch(fetchGetPinjamanInitialData());
  }, []);

  const onPressHeaderButton = () => {
    navigation.navigate('PinjamanListScreen');
  };

  const onPressAjukanPinjaman = () => {
    setShowModal(e => !e);
    dispatch(fetchPinjamanStep1());
    dispatch(setPinjamanInfo({ idJenisPinjaman: selectedItem?.id }));
    navigation.navigate('PinjamanStep1Screen');
  };

  const onPressPinjamanDetail = (item: PengajuanPinjaman) => {
    navigation.navigate('PinjamanDetailScreen', {
      id: item.id,
      status: item.status,
    });
  };

  const onPressPinjamanHorizontal = (item: JenisPinjaman) => {
    setSelectedItem(item);
    setShowModal(e => !e);
  };

  const renderRightButtonHeader = () => {
    return (
      <TouchableOpacity onPress={onPressHeaderButton}>
        <Document color={colors.primary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.pinjaman}
        rightIcon={renderRightButtonHeader()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: sizes.padding,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {!isEmpty(jenisPinjaman) &&
            jenisPinjaman.map((item: JenisPinjaman, i: number) => (
              <PinjamanHorizontalListItem
                item={item}
                key={i}
                onPress={() => onPressPinjamanHorizontal(item)}
              />
            ))}
        </ScrollView>

        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Total Jumlah Pinjaman</Text>
          <Text style={styles.textSubtitle}>
            Rp. {formatter.formatNumberToCurreny(totalJumlahPinjamanDisetujui)}
          </Text>
          {!isEmpty(pengajuanPinjaman) &&
            pengajuanPinjaman.map((item: PengajuanPinjaman, i: number) => {
              if (item.status === 'PENGAJUAN' || item.status === 'DISETUJUI')
                return (
                  <PinjamanListItem
                    item={item}
                    key={i}
                    disabled={item.status === 'PENGAJUAN'}
                    onPress={() => onPressPinjamanDetail(item)}
                  />
                );
            })}
        </View>
      </ScrollView>
      {selectedItem && (
        <PinjamanItemModal
          item={selectedItem as JenisPinjaman}
          showModal={showModal}
          onPress={onPressAjukanPinjaman}
          onPressClose={() => setShowModal(e => !e)}
        />
      )}
    </SafeAreaView>
  );
};
export default PinjamanMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginTop: 30,
    paddingVertical: sizes.padding,
    paddingBottom: 0,
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
