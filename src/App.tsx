import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import MainPage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import PageNotFound from './pages/PageNotFound';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import * as store from './store';
import { setSidebar } from './store/sidebar';

function App() {
  const products = useSelector(store.getProducts)
  const dispatch = useDispatch();
  const location = useLocation();
  const isSidebarOpen = useSelector(store.getIsSidebarOpen);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(store.loadProducts())
    }
  }, [dispatch, products]);

  useEffect(() => {
    if(isSidebarOpen) {
      dispatch(setSidebar(false));
    }
    // eslint-disable-next-line
  }, [location]);


  return (
    <div className="app">
      <Header />
      <Sidebar />
      <Switch>
        <Redirect from="/home" to="/" />
        <Route path="/" exact component={MainPage} />
        <Route path="/:slug" component={ItemPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
