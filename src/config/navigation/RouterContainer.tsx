import React from 'react';
import { StackWrapper } from '.';
import { useSelector } from 'react-redux';
import { ErrorModal, LoadingIndicator } from '../../components';
import { RootState } from '../store/ReduxStore';

const RouterContainer = () => {
  const { isLoading } = useSelector((state: RootState) => state.loading) || {};

  const renderErrorDialog = () => {
    const { options } = useSelector((state: RootState) => state.errorModal);

    return <ErrorModal options={options} />;
  };

  return (
    <>
      <StackWrapper />
      {renderErrorDialog()}
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export default RouterContainer;
