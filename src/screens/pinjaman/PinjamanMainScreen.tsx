import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
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
  PinjamanListItem,
} from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanSucessScreen'>;

const PinjamanMainScreen: React.FC<Props> = ({ navigation }) => {
  const array = new Array(4).fill('');

  const onPressHeaderButton = () => {
    navigation.navigate('PinjamanListScreen');
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
          {array.map((_, i) => (
            <PinjamanHorizontalListItem key={i} />
          ))}
        </ScrollView>

        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Total Jumlah Pinjaman</Text>
          <Text style={styles.textSubtitle}>Rp. 15.000.000</Text>
          <PinjamanListItem />
          <PinjamanListItem />
          <PinjamanListItem />
        </View>
      </ScrollView>
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
