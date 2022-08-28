import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants';

const PinjamanDetailItem = (props: { title: string; content: string }) => {
  const { title, content } = props;
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.textItemTitle}>{title}</Text>
      <Text style={styles.textItemContent}>{content}</Text>
    </View>
  );
};

export default PinjamanDetailItem;

const styles = StyleSheet.create({
  textItemTitle: {
    fontFamily: 'Poppins-Bold',
    color: colors.bodyText,
    fontWeight: '600',
  },
  textItemContent: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontWeight: '600',
  },
});
