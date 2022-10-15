import { createNavigationContainerRef, NavigatorScreenParams } from '@react-navigation/native';

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

const navigateAndReset = (
  name: keyof ReactNavigation.RootParamList,
  params?: NavigatorScreenParams<ReactNavigation.RootParamList>['params'],
) => {
  if (navigationRef.isReady() && navigationRef.current) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [{ name, params }],
    });
  }
};

export { goBack, navigate, navigateAndReset, navigationRef };
