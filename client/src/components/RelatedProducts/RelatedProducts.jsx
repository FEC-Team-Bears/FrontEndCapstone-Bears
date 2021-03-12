import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import RelatedProductCard from './RelatedProductCard.jsx';

const RelatedProducts = ({ productId, handleClick, mainProductDetails, reviews }) => {

  const [relatedProducts, getRelatedProducts] = useState([]);

  useEffect(() => {
    axiosGetRelatedProducts();
  }, [productId]);


  const axiosGetRelatedProducts = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}/related`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(products => getRelatedProducts(products.data))
      .catch(error => console.error(error));
  };

  const relatedCarousel = $(function() {
    $('.jcarousel').jcarousel();
  });

  $('.jcarousel').jcarousel({
    wrap: 'none'
  });

  let filter = { productId: 0 };

  return (
    <div className="wrapper">
      <div className="jcarousel">
        <ul>
          {relatedProducts.map(relatedProductId => {
            if (Number(relatedProductId) !== productId && filter[relatedProductId] === undefined) {
              filter[relatedProductId] = 1;
              return <li key={ relatedProductId }>
                <RelatedProductCard
                  relatedProductId={ relatedProductId }
                  handleClick={ handleClick }
                  mainProductDetails={ mainProductDetails }
                  reviews={ reviews }
                  related={ true } />
              </li>;
            }
          })}
        </ul>
      </div>
      <a href="#" className="jcarousel-control-prev disabled" data-jcarouselcontrol="true">‹</a>
      <a href="#" className="jcarousel-control-next disabled" data-jcarouselcontrol="true">{console.log('Active: ', $('.inactive'))}›</a>
    </div>
  );
};

export default RelatedProducts;