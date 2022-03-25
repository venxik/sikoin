import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface CardLastItemProps {
  icon: ImageSourcePropType;
  style?: ViewStyle;
  customText?: string;
  onPress: () => void;
}
