import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ButtonTextProps extends TouchableOpacityProps {
  buttonContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  onPress: () => void;
  disabled?: boolean;
  text?: string;
  icon?: ImageSourcePropType;
  iconLocation?: 'left' | 'right' | 'center';
  shadow?: boolean;
  secondary?: boolean;
}
