import { ViewStyle } from 'react-native';

import { ProductData } from '../../redux/reducers/MarketReducer';

export interface CardMarketSmallProps {
  item: ProductData;
  onPress: () => void;
  onPressVoucher?: () => void;
  onPressWishlist?: () => void;
  style?: ViewStyle;
  imageHeight?: number | string;
}
