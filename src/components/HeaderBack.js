import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { colors, icons } from '../constants';

const HeaderBack = props => {
  const { onPress, rightIcon, customLeftIcon, title, style } = props || {};
  const navigation = useNavigation();

  const validatePress = () => {
    if (onPress) onPress();
    else navigation.goBack();
  };
  const leftIcon = customLeftIcon ? customLeftIcon : icons.arrow_left_primary;
  return (
    <View style={[Styles.container, { ...style }]}>
      <View style={Styles.innerContainer}>
        <TouchableOpacity onPress={validatePress}>
          <Image
            style={{ width: 24, height: 24 }}
            resizeMode={'stretch'}
            source={leftIcon}
          />
        </TouchableOpacity>
        <Text style={Styles.title}>{title}</Text>
      </View>
      <View style={Styles.rightContainer}>{rightIcon}</View>
    </View>
  );
};

HeaderBack.propTypes = {
  customPress: PropTypes.bool,
  onPress: PropTypes.func,
  rightIcon: PropTypes.any,
  customLeftIcon: PropTypes.any,
  title: PropTypes.string,
  style: PropTypes.any,
};

HeaderBack.defaultProps = {
  customPress: null,
  onPress: null,
  rightIcon: null,
  customLeftIcon: null,
  title: null,
  style: null,
};

export default HeaderBack;

const Styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingHorizontal: '6%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
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
