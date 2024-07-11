import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';

import { Provider } from 'react-redux';
import { store } from './store/store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);

reportWebVitals();
