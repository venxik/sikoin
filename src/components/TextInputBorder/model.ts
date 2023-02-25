import { ImageSourcePropType, TextInputProps, ViewStyle } from 'react-native';

import { FieldError } from 'react-hook-form';

export interface TextInputBorderProps extends TextInputProps {
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  textBoxStyle?: ViewStyle;
  error?: FieldError;
  errorText?: string;
  addRightButton?: boolean;
  onPressButton?: () => void;
}
