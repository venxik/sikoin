import { ViewStyle } from 'react-native';

import { MarketDataResponse } from '../../redux/reducers/MarketReducer';

export interface CardMarketSmallProps {
  item: MarketDataResponse;
  onPress: () => void;
  onPressVoucher?: () => void;
  onPressWishlist?: () => void;
  style?: ViewStyle;
  imageHeight?: number | string;
}
