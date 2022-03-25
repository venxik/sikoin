import { createNavigationContainerRef, Route } from '@react-navigation/native';
import { ParentStackParamList } from './model';

const navigationRef = createNavigationContainerRef<ParentStackParamList>();

// const navigate = (name, params: ) => {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// };

export { navigationRef };
