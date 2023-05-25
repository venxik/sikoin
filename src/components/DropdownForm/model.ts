import { ViewStyle } from 'react-native';

import { FieldError } from 'react-hook-form';

import { City, Province } from '../../redux/reducers/AlamatReducer';

export interface DropdownFormProps {
  title?: string;
  style?: ViewStyle;
  error?: FieldError;
  errorText?: string;
  data: { label: string; value: string }[] | Province[] | City[];
  onChange: (value: object) => void;
  value?: string;
  maxHeight?: number;
  labelField?: string;
  valueField?: string;
  disable?: boolean;
}
