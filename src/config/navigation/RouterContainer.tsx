import React from 'react';
import { StackWrapper } from '.';
import { ErrorModal, LoadingIndicator } from '../../components';
import { useAppSelector } from '../store/ReduxStore';

const RouterContainer: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.loading) || {};

  const renderErrorDialog = () => {
    const { options } = useAppSelector(state => state.errorModal);

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
