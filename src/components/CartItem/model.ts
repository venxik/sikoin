import { CartProductData } from '../../redux/reducers/MarketReducer';

export interface CartItemProps {
  data: CartProductData;
  onPressCheckbox: (status: boolean) => void;
}
