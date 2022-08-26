import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants';
import { HeaderBackProps } from './model';
import { ArrowLeft } from 'react-native-iconly';
import { isEmpty } from 'lodash';

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

  const renderIcon = () => {
    if (!isEmpty(customLeftIcon)) {
      return customLeftIcon;
    }
    return <ArrowLeft color={colors.primary} />;
  };
  return (
    <View style={[Styles.container, { ...style }]}>
      <View style={[Styles.innerContainer, { flex: rightIcon ? 0.7 : 0 }]}>
        <TouchableOpacity onPress={validatePress} disabled={disabled}>
          {renderIcon()}
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
