import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
} from '../constants';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { CalendarPickerProps } from './types';

const CalendarPicker: FC<CalendarPickerProps> = props => {
  const { title, style, onChangeDate, value } = props || {};
  const [date, setDate] = useState<Date>(
    !isEmpty(value) ? new Date(value) : new Date(),
  );
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (event.type !== 'dismissed') {
      if (selectedDate) {
        setDate(selectedDate);
        onChangeDate(selectedDate);
      }
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={[styles.defaultContainer, style]}>
      {!isEmpty(title) && <Text style={styles.titleText}>{title}</Text>}
      <TouchableOpacity onPress={showDatepicker} style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={icons.icon_calendar_small} style={styles.icon} />
          <Text style={styles.valueText}>
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
          onChange={(event: DateTimePickerEvent, selectedDate?: Date): void => {
            onChange(event, selectedDate);
          }}
        />
      )}
    </View>
  );
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
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginRight: 10,
  },
  valueText: {
    color: colors.primary,
    fontWeight: '500',
  },
});
