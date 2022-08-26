import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { HeaderBack } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { Search } from 'react-native-iconly';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanSucessScreen'>;

const PinjamanDetailScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToRincian = () => {
    navigation.navigate('PinjamanRincianScreen');
  };

  const Item = (props: { title: string; content: string }) => {
    const { title, content } = props;
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={styles.textItemTitle}>{title}</Text>
        <Text style={styles.textItemContent}>{content}</Text>
      </View>
    );
  };

  const SimulasiPinjaman = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textItemTitle}>Simulasi Pinjaman</Text>
          <TouchableOpacity onPress={navigateToRincian}>
            <Search
              color={colors.primary}
              style={{ marginLeft: sizes.padding }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total Angsuran Pokok : '}
          </Text>
          <Text style={styles.textItemContent}>Rp. 60.000</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total Angsuran Pokok : '}
          </Text>
          <Text style={styles.textItemContent}>Rp. 60.000</Text>
        </View>
        <View
          style={{
            width: '70%',
            height: 2,
            backgroundColor: colors.primary,
            marginTop: sizes.padding,
            marginBottom: 4,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textItemContent, { flex: 0.7 }]}>
            {'Total : '}
          </Text>
          <Text style={styles.textItemContent}>Rp. 60.000</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.kembali} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: sizes.padding,
        }}>
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Total Jumlah Pinjaman</Text>
          <Text style={styles.textSubtitle}>Rp. 10.000.000</Text>
          <Item content="Test" title="Nama lengkap" />
          <Item content="Test" title="Nama lengkap" />
          <Item content="Test" title="Nama lengkap" />
          <Item content="Test" title="Nama lengkap" />
          <Item content="Test" title="Nama lengkap" />
          <SimulasiPinjaman />
          <Item content="Test" title="Sisa bulan pembayaran" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PinjamanDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyTextGrey,
  },
  textSubtitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: colors.bodyTextGrey,
    fontSize: 24,
  },
  textItemTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyText,
    fontWeight: '600',
  },
  textItemContent: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
  },
});
