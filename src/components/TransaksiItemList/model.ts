import { TransaksiData } from '../../redux/reducers/TransaksiReducer';

export interface TransaksiItemListProps {
  item: TransaksiData;
  onPress?: () => void;
}
