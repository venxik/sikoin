import {
  ImageSourcePropType,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ButtonIconProps extends TouchableOpacityProps {
  buttonContainerStyle?: ViewStyle;
  icon: ImageSourcePropType;
  shadow?: boolean;
  secondary?: boolean;
}
