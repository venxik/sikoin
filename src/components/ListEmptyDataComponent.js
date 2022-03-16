import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors, icons, SCREEN_WIDTH, sizes } from '../constants';

const ListEmptyDataComponent = props => {
  const { text, onPress } = props || {};
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={icons.icon_add_data}
        style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3 }}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

ListEmptyDataComponent.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListEmptyDataComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: sizes.padding,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    width: '70%',
    textAlign: 'center',
  },
});
