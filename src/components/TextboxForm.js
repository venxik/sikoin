import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors, icons, SCREEN_HEIGHT, sizes } from '../constants';
import PropTypes from 'prop-types';

const TextboxForm = props => {
  const { style, textBoxStyle, value, onChangeText, title, error, errorText } =
    props || {};
  const [editable, setEditable] = useState(false);

  const input = useRef(null);

  useEffect(() => {
    if (editable) {
      input.current.focus();
    }
  }, [editable]);

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <TextInput
          {...props}
          style={[
            styles.textBox,
            {
              ...textBoxStyle,
              color: editable ? colors.bodyText : colors.bodyTextLightGrey,
              borderBottomColor: error
                ? colors.red
                : editable
                ? colors.bodyText
                : colors.bodyTextLightGrey,
            },
          ]}
          ref={input}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="always"
          editable={editable}
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={() => setEditable(e => !e)}>
          <Image
            source={icons.edit_textbox}
            style={{
              width: sizes.icon_size,
              height: sizes.icon_size,
            }}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.textError}>{errorText}</Text>}
    </View>
  );
};

TextboxForm.propTypes = {
  style: PropTypes.any,
  value: PropTypes.string,
  textBoxStyle: PropTypes.any,
  onChangeText: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.object,
  errorText: PropTypes.string,
};

TextboxForm.defaultProps = {
  style: null,
  value: null,
  textBoxStyle: null,
  onChangeText: null,
  title: 'Title',
  error: null,
  errorText: '',
};

const styles = StyleSheet.create({
  defaultContainer: {
    minHeight: SCREEN_HEIGHT * 0.06,
    backgroundColor: colors.white,
    marginBottom: sizes.padding,
  },
  textBox: {
    width: '85%',
    borderBottomWidth: 1,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
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
  titleText: { color: colors.bodyTextGrey, fontFamily: 'Poppins-Regular' },
  textError: { color: colors.red, fontSize: 12, marginTop: 2 },
});

export default TextboxForm;
