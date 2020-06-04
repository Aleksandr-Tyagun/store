import React, { useState } from 'react';

import './ProductCard.scss';
import { useHistory } from 'react-router-dom';
import Carusel from './Carousel';

type Props = {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    title,
    imageUrl,
    category,
    price,
    available,
    slug,
  } = product;

  const [itemImage, setItemImage] = useState(imageUrl);
  const history = useHistory();

  const changeImage = (imgUrl: string) => {
    setItemImage(imgUrl)
  }

  const handleClick = () => {
    history.push({ pathname: slug })
  }

  return (
    <article onClick={handleClick} className="product-card">
      <img
        className="product-card__image"
        src={itemImage}
        alt="title"
      />
      <div className="product-card__details" >
        <div className="product-card__carusel">
          <Carusel
            activeImage={itemImage}
            changeImage={changeImage}
            
          />
        </div>
        <span className="product-card__details-category">
          {category}
        </span>
        <span
          className="product-card__details-title"
        >
          {title}
        </span>
        <span className="product-card__details-price">
          $
            {price}
        </span>
        <span className="product-card__details-available">
          {`на складе: ${available}`}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
