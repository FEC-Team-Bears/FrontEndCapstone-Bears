import React, {useState, useEffect} from 'react';
import StyleSelector from './StyleSelector.jsx';
import StarRating from '../ReviewsRatings/StarRating.jsx';
import AddToCart from './AddToCart.jsx';


const ProductDetails = ({ productDetails, styles, setStyle, reviews, style }) => {

  const scrollToReviews = () => {
    var ele = document.getElementsByClassName('ratings-reviews-container')[0];
    ele.scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <div>
      <div className="product-info-align product-top">
        <StarRating reviews={ reviews }/><div className='read-all-reviews' onClick={ scrollToReviews }>read all reviews</div>
      </div>
      <div className="product-info-align"><h3>{ productDetails.category}</h3></div>
      <div className="product-info-align"><h1>{ productDetails.name }</h1></div>
      {!styles[style] ? ''
        : !styles[style].sale_price ? <div className="product-info-align"> {styles[style].original_price} USD</div>
          : <div className="product-info-align"><span className="red">{styles[style].original_price} USD </span> <span className="new-price"> {styles[style].sale_price} USD </span></div>
      }
      <a href="https://www.facebook.com/" className="fa fa-facebook"></a>
      <a href="https://twitter.com/" className="fa fa-twitter"></a>
      <a href="https://www.pinterest.com/" className="fa fa-pinterest"></a>
      <a href="https://www.instagram.com/turbotwolegs/?hl=en" className="fa fa-instagram"></a>
      <StyleSelector
        styles={ styles }
        setStyle={ setStyle } />
      <AddToCart styles={ styles} style={ style }/>
    </div>
  );
};

export default ProductDetails;