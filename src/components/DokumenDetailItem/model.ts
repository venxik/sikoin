import { TextStyle } from 'react-native';

export interface DokumenDetailItemProps {
  leftText: string;
  rightText?: string;
  rightCustom?: Element;
  rightTextStyle?: TextStyle;
}
