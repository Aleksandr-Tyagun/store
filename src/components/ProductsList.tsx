import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import './ProductsList.scss';
import * as store from '../store';
import ProductCard from './ProductCard';
import { SORT_BY, CATEGORY } from '../constants';

const ProductsList = () => {
  const products: Product[] = useSelector(store.getProducts);
  const sortBy = useSelector(store.getSortBy);
  const filterBy = useSelector(store.getFilterBy);

  const sortedProducts = useMemo(() => {
    let result = [...products];

    if(filterBy !== '' && filterBy !== CATEGORY.all) {
      result = result.filter(item => item.category === filterBy)
    }

    switch (sortBy) {
      case SORT_BY.priceAsc:
        return [...result]
          .sort((a, b) => a.price - b.price)

      case SORT_BY.priceDesc:
        return [...result]
          .sort((a, b) => b.price - a.price)

      case SORT_BY.popular:
        return [...result]
          .sort((a, b) => b.reviews - a.reviews)

      case SORT_BY.new:
        return [...result]
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

      default:
        return result
    }
  }, [sortBy, filterBy, products]);

  return (
    <>
      {sortedProducts.length > 0 && (
        <div className="products">
          {sortedProducts.map((product: Product) => (
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
