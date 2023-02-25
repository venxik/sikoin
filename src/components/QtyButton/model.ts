import { ViewStyle } from 'react-native';

export interface QtyButtonProps {
  qty: number;
  onPressMinus: () => void;
  onPressPlus: () => void;
  style?: ViewStyle;
  max?: number;
  min?: number;
}
