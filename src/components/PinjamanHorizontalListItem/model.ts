import { JenisPinjaman } from '../../redux/reducers/PinjamanReducer';

export type PinjamanHorizontalListItemProps = {
  onPress: () => void;
  item: JenisPinjaman;
};
