import { CartItemData } from '../../redux/reducers/MarketReducer';

export interface CartItemProps {
  data: CartItemData;
  onPressVoucher: () => void;
}
