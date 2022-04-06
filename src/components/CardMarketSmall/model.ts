import { ViewStyle } from 'react-native';
import { MarketDataResponse } from '../../redux/reducers/MarketReducer';

export interface CardMarketSmallProps {
  item: MarketDataResponse;
  onPress: () => void;
  onPressWishlist: () => void;
  onPressVoucher: () => void;
  style?: ViewStyle;
}
