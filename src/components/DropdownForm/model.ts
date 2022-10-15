import { ViewStyle } from 'react-native';

import { FieldError } from 'react-hook-form';

export interface DropdownFormProps {
  title?: string;
  style?: ViewStyle;
  error?: FieldError;
  errorText?: string;
  data: { label: string; value: string }[];
  onChange: (value: object) => void;
  value?: string;
  maxHeight?: number;
}
