import { AlamatDataResponse } from '../../redux/reducers/AlamatReducer';

export interface CardAlamatProps {
  item: AlamatDataResponse;
  onPressUbah: () => void;
  onPressDelete: () => void;
}
