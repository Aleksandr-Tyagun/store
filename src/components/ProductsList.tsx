import React from 'react';
import { useSelector } from 'react-redux';

import './ProductsList.scss';
import * as store from '../store';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const visibleProducts = useSelector(store.getVisibleProducts);

  return (
    <>
      {visibleProducts.length > 0 && (
        <div className="products">
          {visibleProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsList;
