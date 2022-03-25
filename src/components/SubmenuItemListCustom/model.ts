import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface SubmenuItemListCustomProps {
  icon: ImageSourcePropType;
  title: string;
  style?: ViewStyle;
  customRightComponent: Element;
}
