import React, {useState, useEffect} from 'react';
import StyleSelector from './StyleSelector.jsx';
import StarRating from '../ReviewsRatings/StarRating.jsx';


const ProductDetails = ({ productDetails, styles, getStyles, reviews }) => {
  return (
    <div>
      <div className="product-info-align">
        <StarRating reviews={ reviews }/>
      </div>
      <div className="product-info-align"><h3>{ productDetails.category}</h3></div>
      <div className="product-info-align"><h1>{ productDetails.name }</h1></div>
      <div className="product-info-align">${ productDetails.default_price } USD</div>
      <StyleSelector
        styles={ styles }
        getStyles={ getStyles } />
    </div>
  );
};

export default ProductDetails;