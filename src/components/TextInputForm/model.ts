import { ImageSourcePropType, TextInputProps, ViewStyle } from 'react-native';

import { FieldError } from 'react-hook-form';

export interface TextInputFormProps extends TextInputProps {
  title?: string;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: ViewStyle;
  error?: FieldError;
  errorText?: string;
  disableEdit?: boolean;
}
