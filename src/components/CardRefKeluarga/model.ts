import { KeluargaData } from '../../redux/reducers/RefKeluargaReducer';

export interface CardRefKeluargaProps {
  item: KeluargaData;
  onPressUbah: () => void;
  onPressDelete: () => void;
}
