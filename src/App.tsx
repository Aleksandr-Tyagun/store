import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import MainPage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" />
        <Route path="/" exact component={MainPage} />
        <Route path="/:product" component={ItemPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
