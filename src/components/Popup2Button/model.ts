import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface Popup2ButtonProps {
  style?: ViewStyle;
  showPopup: boolean;
  headerText?: string;
  contentText?: string;
  buttonLeftTitle: string;
  buttonRightTitle: string;
  buttonLeftOnPress: () => void;
  buttonRightOnPress: () => void;
  customContent?: Element;
  headerImage?: ImageSourcePropType;
  headerTextStyle?: TextStyle;
  contentTextStyle?: TextStyle;
  iconStyle?: ImageStyle;
}
