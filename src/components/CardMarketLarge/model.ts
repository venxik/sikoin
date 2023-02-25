import { ViewStyle } from 'react-native';

import { ProductData } from '../../redux/reducers/MarketReducer';

export interface CardMarketLargeProps {
  item: ProductData;
  onPress: () => void;
  onPressBeli: () => void;
  onPressWishlist?: () => void;
  style?: ViewStyle;
}
