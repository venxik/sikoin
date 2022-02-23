import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { colors } from '../constants';

const HeaderBack = props => {
  const { customPress, onPress, rightIcon, customLeftIcon, title } =
    props || {};
  const navigation = useNavigation();

  const validatePress = () => {
    if (customPress) onPress();
    else navigation.goBack();
  };
  const leftIcon = customLeftIcon
    ? customLeftIcon
    : require('assets/icons/arrow_left_primary.png');
  return (
    <View style={[Styles.container, { ...props.style }]}>
      <View style={Styles.innerContainer}>
        <TouchableOpacity onPress={validatePress}>
          <Image
            style={{ width: 36, height: 38 }}
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
};

HeaderBack.defaultProps = {
  customPress: null,
  onPress: null,
  rightIcon: null,
  customLeftIcon: null,
  title: null,
};

export default HeaderBack;

const Styles = StyleSheet.create({
  container: {
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingHorizontal: '6%',
    flexDirection: 'row',
    backgroundColor: colors.primaryWhite,
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
