import React, { useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ItemPage.scss';
import * as store from '../store';
import classNames from 'classnames';
import { addToCart } from '../store/cart';
import { setSidebar } from '../store/sidebar';

const ItemPage = () => {
  const history = useHistory();
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [pickedSize, setPickedSize] = useState('');
  const products = useSelector(store.getProducts);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(store.getIsSidebarOpen);

  const product = useMemo(() => {
    return products.find((product: Product) => product.slug === slug)
  }, [slug, products])

  return (
    <>
      {product && (
        <main>
          <section className="product">
            <img
              className="product__image"
              src={product.imageUrl}
              alt={product.title}
            />
            <div>
              <button
                onClick={history.goBack}
                className="product__button product__button--back"
              >
                Назад
            </button>
              <div className="product__category">
                {product.category}
              </div>
              <h1 className="product__title">
                {product.title}
              </h1>
              <div className="product__actions">
                <div className="product__dropdown">
                  <button
                    className="product__button product__button--size"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {pickedSize ? pickedSize : 'Размер'}
                  </button>

                  <ul
                    className={classNames(
                      'product__dropdown-list',
                      { 'product__dropdown-list--active': isOpen }
                    )}
                  >
                    {product.sizes.map((size: string) => (
                      <li
                        className={classNames(
                          'product__dropdown-item',
                          { 'product__dropdown-item--active': pickedSize === size }
                        )}
                        onClick={() => {
                          setPickedSize(size)
                          setIsOpen(false)
                        }}
                        key={size}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>

                </div>
                <button
                  className={classNames(
                    'product__buy',
                    { 'product__buy--disabled': pickedSize === '' }
                  )}
                  disabled={pickedSize === ''}
                  onClick={() => {
                    dispatch(addToCart({
                      id: product.id,
                      title: product.title,
                      size: pickedSize,
                      imageUrl: product.imageUrl,
                      price: product.price,
                      quantity: 1,
                    }))
                    if(!isSidebarOpen) {
                      dispatch(setSidebar(true))
                    }
                  }}
                >
                  В корзину
            </button>
              </div>
              <div className="product__details">
                <div className="product__details-left">
                  <p className="product__desc">
                    Рубашка на пуговицах от <b>Yohji Yamamoto</b> (Йоджи Ямамото). Классический воротник, застежка на пуговицах спереди, нагрудный карман, удлиненная модель, прошитые панели, длинные рукава и манжеты на пуговицах.
              </p>
                  <p className="product__desc">
                    Рост модели 1,88 м, надет размер 2
              </p>
                  <p className="product__desc">
                    Образ модели дополнен: Yohji Yamamoto широкие укороченные брюки, Converse кроссовки 'One Star'.
              </p>
                </div>
                <div className="product__details-right">
                  <table className="product__properties">
                    <tbody>
                      <tr>
                        <td className="product__properties-title">Цвет:</td>
                        <td className="product__properties-value">Черный</td>
                      </tr>
                      <tr>
                        <td className="product__properties-title">Состав:</td>
                        <td className="product__properties-value">Шерсть 100%</td>
                      </tr>
                      <tr>
                        <td className="product__properties-title">Уход:</td>
                        <td className="product__properties-value">Сухая чистка</td>
                      </tr>
                      <tr>
                        <td className="product__properties-title">Артикул:</td>
                        <td className="product__properties-value">HHB73100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      )
      }
    </>
  );
}

export default ItemPage;
