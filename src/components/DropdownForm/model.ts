import { FieldError } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { DropdownProps } from 'react-native-element-dropdown/src/Dropdown/type';

export interface DropdownFormProps extends DropdownProps {
  title?: string;
  style?: ViewStyle;
  error?: FieldError;
  errorText?: string;
}
