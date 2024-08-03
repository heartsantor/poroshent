import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuthCheck from './hooks/useAuthCheck';
import routes, { renderRoutes } from './routes';
import LoadingSpinner from './components/Loader/LoadingSpinner';
import NetworkWarningModal from './components/Modal/NetworkWarningModal';

const App = () => {
  const isAuthChecked = useAuthCheck();
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);
  console.log('🚀 ~ App ~ showNetworkWarning:', showNetworkWarning);

  // useEffect(() => {
  //   const handleOnlineStatus = () => {
  //     if (!navigator.onLine) {
  //       setShowNetworkWarning(true);
  //     } else {
  //       setShowNetworkWarning(false);
  //     }
  //   };

  //   // Check network status on mount
  //   handleOnlineStatus();

  //   // Add event listeners for network status changes
  //   window.addEventListener('online', handleOnlineStatus);
  //   window.addEventListener('offline', handleOnlineStatus);

  //   // Cleanup event listeners on unmount
  //   return () => {
  //     window.removeEventListener('online', handleOnlineStatus);
  //     window.removeEventListener('offline', handleOnlineStatus);
  //   };
  // }, []);

  if (!isAuthChecked) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      {renderRoutes(routes)} <ToastContainer />
      <NetworkWarningModal show={showNetworkWarning} onHide={() => setShowNetworkWarning(false)} />
    </BrowserRouter>
  );
};

export default App;
