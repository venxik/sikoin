import { ViewStyle } from 'react-native';
import { NotifikasiData } from '../../redux/reducers/NotifikasiReducer';

export interface NotifikasiItemProps {
  item: NotifikasiData;
  style?: ViewStyle;
  onPress: () => void;
}
