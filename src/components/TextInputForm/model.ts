import { FieldError } from 'react-hook-form';
import { ImageSourcePropType, TextInputProps, ViewStyle } from 'react-native';

export interface TextInputFormProps extends TextInputProps {
  title?: string;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: ViewStyle;
  error?: FieldError;
  errorText?: string;
}
