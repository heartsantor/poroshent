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
        path: '/selling/chicken-selling',
        element: lazy(() => import('./views/selling/ChickenSelling/ChickenSelling'))
      },
      {
        exact: 'true',
        path: '/all-report/due-report',
        element: lazy(() => import('./views/report/DueList/DueList'))
      },
      {
        exact: 'true',
        path: '/customer/customer-add',
        element: lazy(() => import('./views/customer/CustomerAdd/CustomerAdd'))
      },
      {
        exact: 'true',
        path: '/customer/customer-list',
        element: lazy(() => import('./views/customer/CustomerList/CustomerList'))
      }
    ]
  }
];

export default routes;
