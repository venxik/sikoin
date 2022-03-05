import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, sizes } from '../constants';

const DetailItemList = props => {
  const { title, content, showBorder } = props || {};
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: showBorder ? colors.strokeGrey : null,
          borderBottomWidth: showBorder ? 0.5 : 0,
        },
      ]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

DetailItemList.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  showBorder: PropTypes.bool,
};

DetailItemList.defaultProps = {
  showBorder: true,
};

export default DetailItemList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: sizes.padding,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.bodyText,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    marginBottom: 10,
  },
  separator: {
    width: '100%',
  },
});
