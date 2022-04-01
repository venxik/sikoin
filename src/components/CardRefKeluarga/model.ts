import { RefKeluargaResponse } from '../../redux/reducers/RefKeluargaReducer';

export interface CardRefKeluargaProps {
  item: RefKeluargaResponse;
  onPressUbah: () => void;
  onPressDelete: () => void;
}
