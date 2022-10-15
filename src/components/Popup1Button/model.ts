import { FC } from 'react';
import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native';
export interface Popup1ButtonProps {
  style?: ViewStyle;
  showPopup: boolean;
  headerText?: string;
  contentText?: string;
  onPress: () => void;
  customContent?: FC;
  headerImage?: ImageSourcePropType;
  headerTextStyle?: TextStyle;
  contentTextStyle?: TextStyle;
  customButtonText?: string;
  iconStyle?: ImageStyle;
  scrollable?: boolean;
}
