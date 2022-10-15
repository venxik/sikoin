import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { isEmpty } from 'lodash';

import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { getFormattedDate } from '../../utils';
import { CalendarPickerProps } from './model';

const CalendarPicker = (props: CalendarPickerProps) => {
  const {
    title,
    style,
    onChangeDate,
    value,
    error,
    errorText,
    showIcon = true,
    customText = strings.pilih_dot,
  } = props || {};
  const [date, setDate] = useState<Date>(value ? new Date(value as Date) : new Date());
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
      <TouchableOpacity
        onPress={showDatepicker}
        style={[styles.container, error && { borderColor: 'red', borderWidth: 1 }]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image source={icons.icon_calendar_small} style={styles.icon} />
          <Text style={styles.valueText}>
            {value ? getFormattedDate(value as string) : customText}
          </Text>
        </View>
        {showIcon && (
          <Image
            source={icons.icon_dropdown}
            style={{ width: sizes.padding, height: sizes.padding }}
          />
        )}
      </TouchableOpacity>
      {error && <Text style={styles.textError}>{errorText}</Text>}

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
  titleText: {
    color: colors.bodyTextGrey,
    marginBottom: sizes.padding / 2,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    marginRight: 10,
  },
  valueText: {
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },
  textError: {
    color: colors.red,
    fontSize: 12,
    marginTop: 2,
    marginLeft: 10,
  },
});
