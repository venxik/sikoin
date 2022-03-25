import { ImageSourcePropType, TextStyle, ViewStyle } from 'react-native';

export interface HeaderBackProps {
  title?: string;
  rightIcon?: Element;
  customLeftIcon?: ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  textStyle?: TextStyle;
}
