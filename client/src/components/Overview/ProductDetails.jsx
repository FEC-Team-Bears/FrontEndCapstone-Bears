import React, {useState, useEffect} from 'react';
import StyleSelector from './StyleSelector.jsx';
import StarRating from '../ReviewsRatings/StarRating.jsx';


const ProductDetails = ({ productDetails, styles, setStyle, reviews, style }) => {

  console.log('style: ', style);
  console.log('styles: ', styles);
  return (
    <div>
      <div className="product-info-align product-top">
        <StarRating reviews={ reviews }/>
      </div>
      <div className="product-info-align"><h3>{ productDetails.category}</h3></div>
      <div className="product-info-align"><h1>{ productDetails.name }</h1></div>
      {!styles[style] ? ''
        : !styles[style].sale_price ? <div className="product-info-align"> {styles[style].original_price} USD</div>
          : <div className="product-info-align"><span className="red">{styles[style].original_price} USD </span> <span className="new-price"> {styles[style].sale_price} USD </span></div>
      }
      <StyleSelector
        styles={ styles }
        setStyle={ setStyle } />
    </div>
  );
};

export default ProductDetails;