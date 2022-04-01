import {
  createNavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigate = (
  name: keyof ReactNavigation.RootParamList,
  params?: NavigatorScreenParams<ReactNavigation.RootParamList>['params'],
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
export { navigationRef, navigate, goBack };
