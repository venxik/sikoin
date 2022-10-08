import { ViewStyle } from 'react-native';
import { KabarPromoData } from '../../redux/reducers/HomeReducer';

export interface CardKabarProps {
  item: KabarPromoData;
  style?: ViewStyle;
  onPress: () => void;
}
