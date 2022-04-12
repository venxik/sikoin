import { ImageSourcePropType } from 'react-native';

export interface PaymentItemProps {
  data: {
    icon: ImageSourcePropType;
    text: string;
    value: string;
  };
  isSelected: boolean;
  onPress: () => void;
}
