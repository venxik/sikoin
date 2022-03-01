import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonText, HeaderBack } from '../../components';
import { colors, icons, images, strings } from '../../constants';
import { dimensions } from '../../utils';

const DaftarKoperasiIntroScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(1);

  const goBack = () => {
    if (index === 2) setIndex(1);
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={goBack}
        style={{ zIndex: 2 }}
        customLeftIcon={icons.arrow_left_white}
      />
      <Image
        style={{
          width: '100%',
          height: '75%',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
        }}
        resizeMode="stretch"
        source={images.daftar_koperasi_bg}
      />
      {index === 1 ? (
        <Image
          style={{
            width: '80%',
            height: '80%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
          resizeMode="stretch"
          source={images.daftar_koperasi_question_mark}
        />
      ) : (
        <Image
          style={{
            width: '80%',
            height: '95%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
          resizeMode="stretch"
          source={images.daftar_koperasi_question_mark_2}
        />
      )}

      <Text
        style={{
          position: 'absolute',
          bottom: dimensions.SCREEN_HEIGHT * 0.4,
          color: colors.white,
          fontSize: 24,
          paddingHorizontal: 40,
          zIndex: 200,
        }}>
        {index === 1
          ? strings.daftar_koperasi_title_1
          : strings.daftar_koperasi_title_2}
      </Text>

      {index === 1 ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 40,
            zIndex: 10,
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: dimensions.SCREEN_HEIGHT * 0.3,
          }}>
          <ButtonText
            onPress={() => setIndex(2)}
            buttonContainerStyle={{
              width: '47%',
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              backgroundColor: colors.white,
            }}
            text={strings.belum}
            textStyle={{ color: colors.primary }}
          />
          <ButtonText
            // onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              width: '47%',
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              backgroundColor: colors.primary,
            }}
            text={strings.sudah}
            textStyle={{ color: colors.white }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            zIndex: 10,
            position: 'absolute',
            bottom: dimensions.SCREEN_HEIGHT * 0.3,
          }}>
          <ButtonText
            onPress={() => setIndex(2)}
            buttonContainerStyle={{
              width: '100%',
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              backgroundColor: colors.white,
            }}
            text={strings.ayo}
            textStyle={{ color: colors.primary }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default DaftarKoperasiIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
