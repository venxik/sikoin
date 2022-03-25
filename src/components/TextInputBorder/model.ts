import { FieldError } from 'react-hook-form';
import { ImageSourcePropType, TextInputProps, ViewStyle } from 'react-native';

export interface TextInputBorderProps extends TextInputProps {
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: ViewStyle;
  error?: FieldError;
  errorText?: string;
}
