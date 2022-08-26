import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
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
import { colors, icons, sizes, strings } from '../../constants';
import {
  fetchGetPinjamanInitialData,
  JenisPinjaman,
  PengajuanPinjaman,
} from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanSucessScreen'>;

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
    // navigation.navigate('PinjamanListScreen');
  };

  const onPressAjukanPinjaman = () => {
    setShowModal(e => !e);
    navigation.navigate('PinjamanStep1Screen');
  };

  const onPressPengajuanDetail = (item: PengajuanPinjaman) => {
    navigation.navigate('PinjamanStep3Screen');
  };

  const onPressPinjamanHorizontal = (item: JenisPinjaman) => {
    setSelectedItem(item);
    setShowModal(e => !e);
  };

  const renderRightButtonHeader = () => {
    return (
      <TouchableOpacity onPress={onPressHeaderButton}>
        <Image
          source={icons.icon_document_outline}
          style={{
            width: sizes.icon_size * 0.8,
            height: sizes.icon_size * 0.8,
          }}
          resizeMode="contain"
        />
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
            jenisPinjaman.map((item, i) => (
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
            pengajuanPinjaman.map((item, i) => (
              <PinjamanListItem
                item={item}
                key={i}
                onPress={() => onPressPengajuanDetail(item)}
              />
            ))}
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
