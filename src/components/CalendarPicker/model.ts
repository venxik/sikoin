import { ViewStyle } from 'react-native';

export interface CalendarPickerProps {
  style?: ViewStyle;
  title?: string;
  onChangeDate: (value: Date) => void;
  value: Date;
}
