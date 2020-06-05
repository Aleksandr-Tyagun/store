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

  const visibleProducts = useMemo(() => {
    const result = products.filter(item => {
      if(filterBy !== '' && filterBy !== CATEGORY.all) {
        return item.category === filterBy
      }

      return item
    });

    switch (sortBy) {
      case SORT_BY.priceAsc:
        return result
          .sort((a, b) => a.price - b.price);

      case SORT_BY.priceDesc:
        return result
          .sort((a, b) => b.price - a.price);

      case SORT_BY.popular:
        return result
          .sort((a, b) => b.reviews - a.reviews);

      case SORT_BY.new:
        return result
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

      default:
        return result;
    }
  }, [filterBy, sortBy, products]);

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
