import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/',
    element: lazy(() => import('./views/signin/SignIn'))
  },
  {
    exact: 'true',
    path: '/receipts/trade/:tradeId?',
    element: lazy(() => import('./views/receipts/TradeReceipts/TradeReceipts'))
  },
  {
    exact: 'true',
    path: '/receipts/transaction/:transactionId?',
    element: lazy(() => import('./views/receipts/TransactionReceipts/TransactionReceipts'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/chalan/product-name-entry/:productId?',
        element: lazy(() => import('./views/chalan/ProductNameEntry/ProductNameEntry'))
      },
      {
        exact: 'true',
        path: '/chalan/product-stock-entry',
        element: lazy(() => import('./views/chalan/ChickenStockEntry/ChickenStockEntry'))
      },
      {
        exact: 'true',
        path: '/invoice/make-invoice',
        element: lazy(() => import('./views/invoice/MakeInvoice/MakeInvoice'))
      },
      {
        exact: 'true',
        path: '/invoice/invoice-list',
        element: lazy(() => import('./views/invoice/InvoiceList/InvoiceList'))
      },
      {
        exact: 'true',
        path: '/invoice/draft-invoice',
        element: lazy(() => import('./views/invoice/DraftInvoice/DraftInvoice'))
      },
      {
        exact: 'true',
        path: '/invoice/draft-invoice-list',
        element: lazy(() => import('./views/invoice/DraftInvoiceList/DraftInvoiceList'))
      },
      {
        exact: 'true',
        path: '/all-report/due-report',
        element: lazy(() => import('./views/report/DueList/DueList'))
      },
      {
        exact: 'true',
        path: '/all-report/customer-report',
        element: lazy(() => import('./views/report/CustomerReport/CustomerReport'))
      },
      {
        exact: 'true',
        path: '/all-report/sales-report',
        element: lazy(() => import('./views/report/SalesReport/SalesReport'))
      },
      {
        exact: 'true',
        path: '/customer/customer-add/:customerId?',
        element: lazy(() => import('./views/customer/CustomerAdd/CustomerAdd'))
      },
      {
        exact: 'true',
        path: '/customer/customer-area/:areaId?',
        element: lazy(() => import('./views/customer/CustomerArea/CustomerArea'))
      },
      {
        exact: 'true',
        path: '/sms/sms-dashboard',
        element: lazy(() => import('./views/sms/SmsDashboard/SmsDashboard'))
      },
      {
        exact: 'true',
        path: '/sms/customer-sms',
        element: lazy(() => import('./views/sms/AccordingCustomer/AccordingCustomer'))
      },
      {
        exact: 'true',
        path: '/sms/due-sms',
        element: lazy(() => import('./views/sms/AccordingDue/AccordingDue'))
      },
      {
        exact: 'true',
        path: '/sms/sms-history',
        element: lazy(() => import('./views/sms/SmsHistory/SmsHistory'))
      },
    ]
  }
];

export default routes;
