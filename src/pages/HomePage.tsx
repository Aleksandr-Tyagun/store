import React from 'react';

import './HomePage.scss';
import Navigation from '../components/Navigation';
import ProductsList from '../components/ProductsList';
import Sort from '../components/Sort';

const HomePage = () => {
  return (
    <main className="homepage">
      <div>
        <Navigation />
        <Sort />
      </div>
      <ProductsList />
    </main>
  );
}

export default HomePage;
