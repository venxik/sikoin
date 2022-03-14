import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
} from '../constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const CalendarPicker = props => {
  const { title, style, onChangeDate, value } = props || {};
  const [date, setDate] = useState(
    !isEmpty(value) ? new Date(value) : new Date(),
  );
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (event.type !== 'dismissed') {
      setDate(selectedDate);
      onChangeDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={[styles.defaultContainer, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={showDatepicker} style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.icon_calendar_small}
              style={{
                width: sizes.icon_size,
                height: sizes.icon_size,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: colors.primary,
                fontWeight: '500',
              }}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Image
            source={icons.icon_dropdown}
            style={{ width: sizes.padding, height: sizes.padding }}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              onChange(event, selectedDate);
            }}
          />
        )}
      </View>
    </View>
  );
};

CalendarPicker.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  onChangeDate: PropTypes.func,
  value: PropTypes.any,
};

CalendarPicker.defaultProps = {
  title: 'Tanggal',
  style: null,
  onChangeDate: null,
  value: null,
};

export default CalendarPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.04,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderRadius: SCREEN_HEIGHT * 0.02,
    backgroundColor: colors.tonalLightPrimary,
  },
  defaultContainer: {
    marginBottom: sizes.padding,
  },
  titleText: { color: colors.bodyTextGrey, marginBottom: sizes.padding / 2 },
});
