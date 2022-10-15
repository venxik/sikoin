import { ImageSourcePropType, TextInputProps, ViewStyle } from 'react-native';

import { FieldError } from 'react-hook-form';

export interface TextInputCurrencyProps extends TextInputProps {
  title?: string;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: TextInputProps;
  error?: FieldError;
  errorText?: string;
  onChangeValue: (value: number) => void;
  value?: string;
}
