import { ViewStyle } from 'react-native';

export interface CalendarPickerProps {
  style?: ViewStyle;
  title?: string;
  onChangeDate: (value: Date | number | string) => void;
  value?: Date | number | string;
}
