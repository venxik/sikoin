import { ViewStyle } from 'react-native';
import { KabarData } from '../../redux/reducers/KabarReducer';

export interface CardKabarProps {
  item: KabarData;
  style?: ViewStyle;
  onPress: () => void;
}
