import { TouchableOpacityProps } from 'react-native';

export interface CardVoucherItemProps extends TouchableOpacityProps {
  data?: number;
  onPress?: () => void;
}
