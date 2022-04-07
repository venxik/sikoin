import { ViewStyle } from 'react-native';

export interface FilterVariasiProps {
  item: string[];
  style?: ViewStyle;
  title?: string;
  onChangeItem: (item: string) => void;
}
