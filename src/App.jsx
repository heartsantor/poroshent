import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuthCheck from './hooks/useAuthCheck';
import routes, { renderRoutes } from './routes';
import LoadingSpinner from './components/Loader/LoadingSpinner';

const App = () => {
  const isAuthChecked = useAuthCheck();
  console.log('🚀 ~ App ~ isAuthChecked:', isAuthChecked);

  if (!isAuthChecked) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      {renderRoutes(routes)} <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
