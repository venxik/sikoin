import { CartProductData } from '../../redux/reducers/MarketReducer';

export interface CartItemProps {
  data: CartProductData;
  onPressCheckbox: (id: number, status: boolean) => void;
}
