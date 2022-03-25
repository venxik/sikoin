import { AlamatData } from '../../redux/reducers/AlamatReducer';

export interface CardAlamatProps {
  item: AlamatData;
  onPressUbah: () => void;
  onPressDelete: () => void;
}
