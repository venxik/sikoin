import { FieldError } from 'react-hook-form';
import { ViewStyle } from 'react-native';

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
