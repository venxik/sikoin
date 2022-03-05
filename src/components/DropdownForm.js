import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
} from '../constants';
import PropTypes from 'prop-types';

const DropdownForm = props => {
  const { onPress, value, icon, style, title } = props || {};
  if (title) {
    return (
      <View style={[styles.defaultContainer, style]}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {icon ? (
                <Image
                  source={icon}
                  style={{
                    width: sizes.icon_size,
                    height: sizes.icon_size,
                    marginRight: sizes.icon_size,
                  }}
                />
              ) : null}
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {value ? value : 'Pilih...'}
              </Text>
            </View>
            <Image
              source={icons.icon_dropdown}
              style={{ width: sizes.padding, height: sizes.padding }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {icon ? (
          <Image
            source={icon}
            style={{
              width: sizes.icon_size,
              height: sizes.icon_size,
              marginRight: sizes.icon_size,
            }}
          />
        ) : null}
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {value ? value : 'Pilih...'}
        </Text>
      </View>
      <Image
        source={icons.icon_dropdown}
        style={{ width: sizes.padding, height: sizes.padding }}
      />
    </TouchableOpacity>
  );
};

DropdownForm.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.any,
  title: PropTypes.string,
};

DropdownForm.defaultProp = {
  value: null,
  onPress: null,
  icon: null,
  title: null,
};

export default DropdownForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.04,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: SCREEN_HEIGHT * 0.02,
  },
  defaultContainer: {
    backgroundColor: colors.white,
    marginBottom: sizes.padding,
  },
  titleText: { color: colors.bodyTextGrey, marginBottom: sizes.padding / 2 },
});
