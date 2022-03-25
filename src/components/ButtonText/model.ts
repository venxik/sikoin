import {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ButtonTextProps extends TouchableOpacityProps {
  buttonContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  text: string;
  icon?: ImageSourcePropType;
  iconLocation?: 'left' | 'right';
  shadow?: boolean;
  secondary?: boolean;
}
