import { createNavigationContainerRef, Route } from '@react-navigation/native';
import { ParentStackParamList } from '../types/NavigationTypes';

const navigationRef = createNavigationContainerRef<ParentStackParamList>();

// const navigate = (name, params: ) => {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// };

export { navigationRef };
