import { DeliveryData } from '../../redux/reducers/MarketReducer';

export interface CheckoutDeliveryItemProps {
  data: DeliveryData;
  onPress: (value: DeliveryData) => void;
  isSelected: boolean;
}
