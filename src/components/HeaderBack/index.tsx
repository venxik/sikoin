import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, icons, sizes } from '../../constants';
import { HeaderBackProps } from './model';

const HeaderBack = (props: HeaderBackProps) => {
  const {
    onPress,
    rightIcon,
    customLeftIcon,
    title,
    style,
    disabled = false,
    textStyle,
  } = props || {};
  const navigation = useNavigation();

  const validatePress = () => {
    if (onPress) onPress();
    else navigation.goBack();
  };
  const leftIcon = customLeftIcon ? customLeftIcon : icons.arrow_left_primary;
  return (
    <View style={[Styles.container, { ...style }]}>
      <View style={Styles.innerContainer}>
        <TouchableOpacity onPress={validatePress} disabled={disabled}>
          <Image
            style={{
              width: sizes.icon_size,
              height: sizes.icon_size,
            }}
            resizeMode={'stretch'}
            source={leftIcon}
          />
        </TouchableOpacity>
        <Text style={[Styles.title, { ...textStyle }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={Styles.rightContainer}>{rightIcon}</View>
    </View>
  );
};

export default HeaderBack;

const Styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingHorizontal: '8%',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: colors.black,
    marginLeft: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 0.7,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0.3,
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
