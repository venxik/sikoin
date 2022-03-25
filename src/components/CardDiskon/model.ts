import { ViewStyle } from 'react-native';
import { DiskonData } from '../../redux/reducers/DiskonReducer';

export interface CardDiskonProps {
  item: DiskonData;
  style?: ViewStyle;
  onPress: () => void;
}
