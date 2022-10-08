import { ViewStyle } from 'react-native';
import { KabarPromoData } from '../../redux/reducers/HomeReducer';

export interface CardPromoProps {
  item: KabarPromoData;
  style?: ViewStyle;
  onPressWeb?: () => void;
  onPressSelengkapnya?: () => void;
}
