import { TextStyle, ViewStyle } from 'react-native';

export interface HeaderBackProps {
  title?: string;
  rightIcon?: JSX.Element;
  customLeftIcon?: JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  textStyle?: TextStyle;
}
