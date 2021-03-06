import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';
import RelatedProductCard from './RelatedProductCard.jsx';

const RelatedProducts = ({ currentId, handleClick }) => {

  const [relatedProducts, getRelatedProducts] = useState([]);

  const axiosGetRelatedProducts = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${currentId}/related`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((products) => getRelatedProducts(products.data))
      .catch((error) => console.error(error));
  };

  const relatedCarousel = $(function() {
    $('.jcarousel').jcarousel();
  });

  $('.jcarousel').jcarousel({
    wrap: 'none'
  });

  useEffect(() => {
    axiosGetRelatedProducts();
  }, [currentId]);

  let filter = { currentId: 0 };

  return (
    <div className="wrapper">
      <div className="jcarousel">
        <ul>
          {relatedProducts.map((productId, index) => {
            if (productId != currentId && filter[productId] === undefined) {
              filter[productId] = 1;
              return <li key={ productId }><RelatedProductCard relatedProductId={ productId } handleClick={ handleClick } /></li>;
            }
          })}
        </ul>
      </div>
      <a href="#" className="jcarousel-control-prev" data-jcarouselcontrol="true">‹</a>
      <a href="#" className="jcarousel-control-next" data-jcarouselcontrol="true">›</a>
    </div>
  );
};

export default RelatedProducts;