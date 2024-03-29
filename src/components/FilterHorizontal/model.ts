import { ViewStyle } from 'react-native';

export interface FilterHorizontalProps {
  isSelected: boolean;
  onPress: () => void;
  item: string;
  style?: ViewStyle;
}
