import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface SubmenuItemListProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  showButtonIcon?: boolean;
}
