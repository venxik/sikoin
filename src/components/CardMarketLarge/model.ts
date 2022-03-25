import { ViewStyle } from 'react-native';
import { MarketData } from '../../redux/reducers/MarketReducer';

export interface CardMarketLargeProps {
  item: MarketData;
  onPress: () => void;
  onPressWishlist: () => void;
  style?: ViewStyle;
}
