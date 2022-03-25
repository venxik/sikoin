import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HeaderBack } from '../../components';
import { ChatStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatMainScreen'>;

const ChatMainScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderBack
        disabled
        customLeftIcon={icons.icon_chat}
        title={strings.chat}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatDetailScreen')}
        style={styles.chatContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.iconContainer}
        />
        <View style={styles.textContainer}>
          <View style={styles.textInnerContainer}>
            <Text numberOfLines={1} style={styles.textName}>
              Admin Koperasi
            </Text>
            <Text style={styles.textTime}>19.30</Text>
          </View>
          <Text style={styles.textContent} numberOfLines={1}>
            This is dummy chat text adasd das dasd asd asd as d asd asd as das
            dasdasdas asd asd ad
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatContainer: {
    flexDirection: 'row',
    padding: sizes.padding,
    alignItems: 'center',
  },
  iconContainer: { width: 50, height: 50, borderRadius: 50 },
  textContainer: { marginLeft: sizes.padding / 2, width: '100%' },
  textInnerContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  textContent: {
    color: colors.bodyText,
    width: '70%',
    fontFamily: 'Inter-Regular',
  },
  textTime: { color: colors.primaryLight, fontFamily: 'Poppins-Medium' },
});
