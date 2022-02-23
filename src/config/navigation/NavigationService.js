import React from 'react';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export const navigate = (name, params) => {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const getNavState = () => {
  // const state = navigationRef.current.getRootState();
  // navigationRef.current.addListener('state', (e) => {
  //   const state = e.data.state; //works
  // });
};
