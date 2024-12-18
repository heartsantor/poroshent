import React from 'react';
import { Oval, ThreeDots } from 'react-loader-spinner';

const LoadingSpinner = ({ isInitialLoading = false }) => {
  const loaderStyle = {
    height: isInitialLoading && '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {isInitialLoading ? (
        <div style={loaderStyle}>
          <Oval color="rgb(52 181 253 / 1" secondaryColor="rgb(52 181 253 / 1" height={35} width={35} strokeWidth={6} />
        </div>
      ) : (
        <div style={loaderStyle}>
          <ThreeDots color="rgb(52 181 253 / 1" secondaryColor="rgb(52 181 253 / 1" height={35} width={35} strokeWidth={6} />
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
