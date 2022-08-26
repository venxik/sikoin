import { JenisPinjaman } from '../../redux/reducers/PinjamanReducer';

export interface PinjamanItemModalProps {
  showModal: boolean;
  onPress: () => void;
  onPressClose: () => void;
  item: JenisPinjaman;
}
