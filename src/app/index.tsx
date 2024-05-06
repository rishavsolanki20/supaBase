/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login/Loadable';
import { Signin } from './pages/Signin/Loadable';
import { Viewcart } from './components/Viewcart';
import { slice } from './pages/Cart/slice';
import { store } from './pages/store';
import { Order } from './pages/Order';

export function App() {
  const { i18n } = useTranslation();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/viewCart" element={<Viewcart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}
