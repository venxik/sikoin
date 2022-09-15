import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../config/navigation/model';
import { colors, icons, images, SCREEN_HEIGHT, sizes } from '../../constants';
import { Button, HeaderBack } from '../../components';

type Props = NativeStackScreenProps<ProfileStackParamList, 'IDCardMainScreen'>;

const IDCardMainScreen: React.FC<Props> = ({ navigation }) => {
  const copyToClipboard = () => {
    Clipboard.setString('TESTING');
  };

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <Image source={images.img_id_card} style={styles.imageKtp} />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: sizes.padding,
            alignItems: 'center',
          }}>
          <Text style={styles.textStyle}>{'TESTING'}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image
              source={icons.icon_copy_clipboard}
              style={styles.iconClipboard}
            />
          </TouchableOpacity>
        </View>
        <Button
          shadow={false}
          onPress={() => null}
          text={'Unduh ID Card'}
          // buttonContainerStyle={{ marginBottom: sizes.padding }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={'ID Card'} />
      {renderKtpCard()}
    </SafeAreaView>
  );
};
export default IDCardMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: colors.bodyTextLightGrey,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  iconClipboard: {
    width: sizes.padding,
    height: sizes.padding,
    marginLeft: sizes.padding,
  },
});
