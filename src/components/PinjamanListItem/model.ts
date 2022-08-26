import { PengajuanPinjaman } from '../../redux/reducers/PinjamanReducer';

export interface PinjamanListItemProps {
  onPress: () => void;
  item: PengajuanPinjaman;
}
