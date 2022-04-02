import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface ProfilePictureProps {
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  showKoperasi?: boolean;
  profilUri: ImageSourcePropType | string;
  koperasiUri?: ImageSourcePropType | string;
}
