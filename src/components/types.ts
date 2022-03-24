import { FC } from 'react';
import { FieldError } from 'react-hook-form';
import {
  ImageSourcePropType,
  ImageStyle,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { DropdownProps } from 'react-native-element-dropdown/src/Dropdown/type';

export interface ErrorModalProps {
  options: {
    isVisible: boolean;
    errorType: string;
  };
}

export interface TextInputBorderProps extends TextInputProps {
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: TextInputProps;
  error?: FieldError;
  errorText?: string;
}

export interface TextInputFormProps extends TextInputProps {
  title?: string;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: TextInputProps;
  error?: FieldError;
  errorText?: string;
}

export interface TextInputCurrencyProps extends TextInputProps {
  title?: string;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: TextInputProps;
  error?: FieldError;
  errorText?: string;
  onChangeValue: (value: number) => void;
  value: string;
}

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

export interface ButtonIconProps extends TouchableOpacityProps {
  buttonContainerStyle?: ViewStyle;
  text: string;
  icon: ImageSourcePropType;
  shadow?: boolean;
  secondary?: boolean;
}

export interface CalendarPickerProps {
  style?: ViewStyle;
  title?: string;
  onChangeDate: (value: Date) => void;
  value: Date;
}

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
}

export interface Popup1ScrollProps {
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
}

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

export interface DropdownFormProps extends DropdownProps {
  title?: string;
  style?: ViewStyle;
  error?: FieldError;
  errorText: string;
}
