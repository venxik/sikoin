import { DokumenData } from '../../redux/reducers/DokumenReducer';

export interface DokumenItemListProps {
  item: DokumenData;
  onPress: () => void;
  onPressDeleteFile: () => void;
}
