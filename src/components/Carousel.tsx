import React, { useState } from 'react';
import classNames from 'classnames';

import './Carousel.scss';

const images = [
  'img/products/1.png',
  'img/products/2.png',
  'img/products/3.png',
  'img/products/4.png',
  'img/products/5.png',
  'img/products/6.png',
];

type Props = {
  activeImage: string;
  changeImage: (imgUrl: string) => void;
}

const Carousel: React.FC<Props> = ({ changeImage, activeImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevSlide = () => {
    const lastIndex = images.length - 1;
    const resetIndex = currentImageIndex === 0;
    const index = resetIndex ? lastIndex : currentImageIndex - 1;
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = images.length - 1;
    const resetIndex = currentImageIndex === lastIndex;
    const index = resetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index)
  }

  const index = currentImageIndex;
  let imgToShow = images.slice(index, index + 5);
  if (imgToShow.length < 5) {
    imgToShow = imgToShow.concat(images.slice(0, 5 - imgToShow.length))
  }

  return (
    <div
      className="carousel"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="carousel__prev-button"
        onClick={prevSlide}
      />
      <ul className="carousel__list">
        {imgToShow.map(imageUrl => (
          <li
            className="carousel__item"
            key={imageUrl}
          >
            <img
              className={classNames(
                'carousel__image',
                { 'carousel__image--active': activeImage === imageUrl }
              )}
              onClick={() => changeImage(imageUrl)}
              src={imageUrl}
              alt=""
            />
          </li>
        ))}
      </ul>
      <button
        className="carousel__next-button"
        onClick={nextSlide}
      />
    </div>
  );
}

export default Carousel;
