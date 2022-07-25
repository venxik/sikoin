import { ViewStyle } from 'react-native';
import { MarketDataResponse } from '../../redux/reducers/MarketReducer';

export interface CardMarketLargeProps {
  item: MarketDataResponse;
  onPress: () => void;
  onPressVoucher: () => void;
  onPressWishlist?: () => void;
  style?: ViewStyle;
}
