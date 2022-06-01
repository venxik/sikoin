import { ViewStyle } from 'react-native';

export interface ProfilePictureProps {
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  showKoperasi?: boolean;
  isProfile?: boolean;
  // profilUri: ImageSourcePropType | string;
  // koperasiUri?: ImageSourcePropType | string;
}
