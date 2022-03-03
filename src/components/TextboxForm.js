import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { colors, icons } from '../constants';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const TextboxForm = props => {
  const { style, textBoxStyle, value, secureTextEntry, onChangeText, title } =
    props || {};

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={[{ marginLeft: 10 }, textBoxStyle]}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="always"
          secureTextEntry={secureTextEntry}
          // placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          multiline
        />
        <Image
          source={icons.edit_textbox}
          style={{
            width: dimensions.ICON_SIZE,
            height: dimensions.ICON_SIZE,
            flex: 0.1,
          }}
          resizeMode={'cover'}
        />
      </View>
    </View>
  );
};

TextboxForm.propTypes = {
  style: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  textBoxStyle: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

TextboxForm.defaultProp = {
  style: null,
  disabled: false,
  value: null,
  textBoxStyle: null,
  secureTextEntry: false,
  placeholder: null,
  onChangeText: null,
};

const styles = StyleSheet.create({
  defaultContainer: {
    minHeight: dimensions.SCREEN_HEIGHT * 0.06,
    backgroundColor: colors.white,
  },
  textBoxStyle: {
    flex: 0.85,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeGrey,
  },
  defaultText: {
    fontSize: 14,
    color: colors.white,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: { color: colors.bodyTextGrey, fontSize: 14 },
});

export default TextboxForm;
