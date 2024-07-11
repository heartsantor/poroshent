import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';

import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import 'react-datepicker/dist/react-datepicker.css';

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
