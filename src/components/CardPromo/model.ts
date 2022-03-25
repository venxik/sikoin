import { ViewStyle } from 'react-native';
import { PromoData } from '../../redux/reducers/PromoReducer';

export interface CardPromoProps {
  item: PromoData;
  style?: ViewStyle;
  onPress: () => void;
}
