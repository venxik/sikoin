import React from 'react';

import { ErrorModal, LoadingIndicator } from '../../components';
import { useAppSelector } from '../store';
import { StackWrapper } from '.';

const RouterContainer: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.loading) || {};

  const renderErrorDialog = () => {
    const { options, error } = useAppSelector((state) => state.errorModal);

    return <ErrorModal options={options} error={error} />;
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
