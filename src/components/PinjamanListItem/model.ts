import { ViewStyle } from 'react-native';

import { PengajuanPinjaman } from '../../redux/reducers/PinjamanReducer';

export interface PinjamanListItemProps {
  onPress: () => void;
  item: PengajuanPinjaman;
  disabled?: boolean;
  style?: ViewStyle;
}
