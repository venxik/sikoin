import React from 'react';
import { StackWrapper } from '../navigation';
import { useSelector } from 'react-redux';
import { ErrorModal, LoadingIndicator } from '../../components';

const RouterContainer = () => {
  const { isLoading } = useSelector(state => state.loading);

  const renderErrorDialog = () => {
    const { isVisible, error, options } = useSelector(
      state => state.errorModal,
    );

    return <ErrorModal isVisible={isVisible} error={error} options={options} />;
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
