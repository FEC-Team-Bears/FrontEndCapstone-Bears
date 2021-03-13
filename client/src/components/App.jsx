import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import API_KEY from '/config.js';
import Overview from './Overview/Overview.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import YourOutfit from './YourOutfit/YourOutfit.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ReviewsRatings/RatingsReviews.jsx';

const App = (props) => {
  const [productId, changeProductId] = useState(21111);
  const [productImage, getProductImage] = useState();
  const [reviews, getAllReviews] = useState([]);
  const [styles, getStyles] = useState([]);
  const [productDetails, getProductDetails] = useState({
    'category': null,
    'name': null,
    'default_price': null,
    'features': [{}]
  });

  const axiosGetProductInformation = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
      .then(product => {
        changeProductId(product.data.id);
        getProductDetails(product.data);
      })
      .catch(error => console.error(error));
  };

  const axiosGetProductImage = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((product) => {
        getStyles(product.data.results);
        getProductImage(product.data.results[0].photos[0]);
      })
      .catch(error => console.error(error));
  };

  const axiosGetAllReviews = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews', {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${productId}`,
        'count': 100,
        'sort': 'helpful'
      }
    })
      .then(reviews => {
        getAllReviews(reviews.data.results);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosGetProductInformation();
    // axiosGetProductDetails();
    axiosGetAllReviews();
    axiosGetProductImage();
  }, [productId]);

  // Function needed for resetting
  const setNewId = (e) => {
    changeProductId(e.currentTarget.attributes[0].nodeValue);
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="top_bar col-8"></div>
      </div>
      <Overview
        styles={ styles }
        getStyles={ getStyles }
        reviews={ reviews }
        productId={ productId }
        productDetails={ productDetails }/>
      <RelatedProducts
        productId={ productId }
        handleClick={ setNewId }
        mainProductDetails={ productDetails }
        reviews={ reviews } />
      <YourOutfit
        productId={ productId }
        reviews={ reviews } />
      <LazyLoad>
        <QuestionsAnswers
          productId={ productId } />
      </LazyLoad>
      <LazyLoad>
        <RatingsReviews
          productId={ productId }
          changeId={ changeProductId }
          reviews={reviews}
          changeReviews={axiosGetAllReviews} />
      </LazyLoad>
    </div>
  );
};

export default App;