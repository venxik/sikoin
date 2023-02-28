import { PaymentDetails } from '../../redux/reducers/MarketReducer';

export interface CheckoutPaymentItemProps {
  data: PaymentDetails;
  onPress: () => void;
  isSelected: boolean;
}
